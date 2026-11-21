// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const MENU_EASE = "power2.inOut";
const CONTENT_FADE_DELAY = 0.06;
const CONTENT_FADE_DURATION = 0.18;
const DEFAULT_TRANSITION_DIRECTION = 1;
const NO_INDEX = null;
const REDUCED_MOTION_FADE_DURATION = 0.16;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface DirectionalMenuItem {
  /** Trigger text. */
  label: string;
  /** Panel content. Items without it render as plain links. */
  customContent?: ReactNode;
  /** Link target for items without panel content. */
  href?: string;
  /** Optional click handler for in-app SPA navigation or modal triggers. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const hasDropdownContent = (item?: DirectionalMenuItem): boolean =>
  Boolean(item?.customContent);

const getPaneHeight = (element?: HTMLElement | null): number => {
  if (!element) {
    return 0;
  }

  return element.offsetHeight || element.scrollHeight || 0;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

// Icons, inlined so the component only depends on gsap
function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

// ---- Focus trap (mobile panel) ----

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const isVisible = (element?: HTMLElement | null): boolean => {
  if (!element || element.hidden || element.closest("[inert]")) {
    return false;
  }

  const style = window.getComputedStyle(element);

  if (style.visibility === "hidden" || style.visibility === "collapse") {
    return false;
  }

  return element.getClientRects().length > 0;
};

const getFocusableElements = (container?: HTMLElement | null): HTMLElement[] => {
  if (!container) {
    return [];
  }

  return (
    Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[]
  ).filter(isVisible);
};

interface UseFocusTrapParams {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onEscape?: () => void;
}

/**
 * Keeps keyboard focus inside `containerRef` while `active` is true, wraps
 * Tab / Shift+Tab, calls `onEscape` on Escape, and restores focus on close.
 */
function useFocusTrap({
  active,
  containerRef,
  initialFocusRef,
  onEscape,
}: UseFocusTrapParams) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const focusInitial = () => {
      const target =
        initialFocusRef?.current ??
        getFocusableElements(container)[0] ??
        container;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target === container && !container.hasAttribute("tabindex")) {
        container.setAttribute("tabindex", "-1");
      }

      target.focus();
    };

    // Defer focus so it lands after the menu has mounted / started animating in.
    const focusFrame = requestAnimationFrame(focusInitial);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements(container);

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !container.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }

        return;
      }

      if (activeElement === last || !container.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);

      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [active, containerRef, initialFocusRef]);
}

// ---- Desktop: directional mega menu ----

interface MegaMenuConfig {
  contentFadeDelay: number;
  contentFadeDuration: number;
  distance: number;
  duration: number;
  ease: string;
  fade: boolean;
  heightDuration: number;
  heightEase: string;
}

interface DirectionalMegaMenuProps {
  items: DirectionalMenuItem[];
  config: MegaMenuConfig;
  closeDelay: number;
  panelGap: number;
  activeColor?: string;
  inactiveColor?: string;
}

function DirectionalMegaMenu({
  items,
  config,
  closeDelay,
  panelGap,
  activeColor,
  inactiveColor,
}: DirectionalMegaMenuProps) {
  const panelId = useId();

  // State and refs
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(NO_INDEX);
  const [nextIndex, setNextIndex] = useState<number | null>(NO_INDEX);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(NO_INDEX);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const currentPaneRef = useRef<HTMLDivElement | null>(null);
  const nextPaneRef = useRef<HTMLDivElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimatingRef = useRef(false);
  const queuedIndexRef = useRef<number | null>(NO_INDEX);
  const hasOpenedOnceRef = useRef(false);
  const visualIndexRef = useRef<number | null>(NO_INDEX);
  const transitionDirectionRef = useRef(DEFAULT_TRANSITION_DIRECTION);
  const pointerInsideRef = useRef(false);

  const clearCloseTimer = () => {
    if (!closeTimerRef.current) {
      return;
    }

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const resetMenuState = () => {
    setIsOpen(false);
    setCurrentIndex(NO_INDEX);
    setNextIndex(NO_INDEX);
    setHighlightedIndex(NO_INDEX);
    isAnimatingRef.current = false;
    queuedIndexRef.current = NO_INDEX;
    hasOpenedOnceRef.current = false;
    visualIndexRef.current = NO_INDEX;
    transitionDirectionRef.current = DEFAULT_TRANSITION_DIRECTION;
  };

  const killPanelTweens = () => {
    gsap.killTweensOf([
      menuPanelRef.current,
      panelRef.current,
      viewportRef.current,
      currentPaneRef.current,
      nextPaneRef.current,
    ]);
  };

  const restoreMenuPanel = () => {
    if (!menuPanelRef.current) {
      return;
    }

    gsap.killTweensOf(menuPanelRef.current);
    gsap.set(menuPanelRef.current, {
      opacity: 1,
      height: "auto",
    });
  };

  const closeMenu = () => {
    clearCloseTimer();

    if (!menuPanelRef.current) {
      resetMenuState();
      return;
    }

    killPanelTweens();

    if (prefersReducedMotion()) {
      gsap.to(menuPanelRef.current, {
        opacity: 0,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(menuPanelRef.current, {
            height: 0,
          });
          resetMenuState();
        },
      });
      return;
    }

    gsap.to(menuPanelRef.current, {
      opacity: 0,
      height: 0,
      duration: config.heightDuration,
      ease: config.heightEase,
      onComplete: resetMenuState,
    });
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      closeMenu();
    }, closeDelay);
  };

  const openMenuAt = (index: number) => {
    const item = items[index];

    if (!item || !hasDropdownContent(item)) {
      return;
    }

    restoreMenuPanel();
    setIsOpen(true);
    setCurrentIndex(index);
    setNextIndex(NO_INDEX);
    setHighlightedIndex(index);

    queuedIndexRef.current = NO_INDEX;
    isAnimatingRef.current = false;
    hasOpenedOnceRef.current = false;
    visualIndexRef.current = index;
    transitionDirectionRef.current = DEFAULT_TRANSITION_DIRECTION;
  };

  const requestSwitch = (index: number) => {
    const item = items[index];

    if (!item) {
      return;
    }

    clearCloseTimer();
    restoreMenuPanel();
    setHighlightedIndex(index);

    if (!hasDropdownContent(item)) {
      setHighlightedIndex(NO_INDEX);

      if (isOpen) {
        closeMenu();
      }

      return;
    }

    if (!isOpen || currentIndex === NO_INDEX) {
      openMenuAt(index);
      return;
    }

    if (index === currentIndex && nextIndex === NO_INDEX) {
      visualIndexRef.current = index;
      return;
    }

    if (index === nextIndex) {
      visualIndexRef.current = index;
      return;
    }

    const baseIndex =
      queuedIndexRef.current !== NO_INDEX
        ? queuedIndexRef.current
        : nextIndex !== NO_INDEX
          ? nextIndex
          : visualIndexRef.current !== NO_INDEX
            ? visualIndexRef.current
            : currentIndex;

    const direction = index > (baseIndex as number) ? 1 : -1;

    if (isAnimatingRef.current) {
      queuedIndexRef.current = index;
      visualIndexRef.current = index;
      transitionDirectionRef.current = direction;
      return;
    }

    visualIndexRef.current = index;
    transitionDirectionRef.current = direction;
    setNextIndex(index);
  };

  const onItemEnter = (index: number) => {
    const item = items[index];

    if (!hasDropdownContent(item)) {
      clearCloseTimer();
      setHighlightedIndex(NO_INDEX);

      if (isOpen) {
        closeMenu();
      }

      return;
    }

    requestSwitch(index);
  };

  const onWrapperMouseEnter = () => {
    pointerInsideRef.current = true;
    clearCloseTimer();
  };

  const onWrapperMouseLeave = () => {
    pointerInsideRef.current = false;
    scheduleClose();
  };

  // Escape closes and hands focus back to the open trigger
  const onWrapperKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !isOpen) {
      return;
    }

    const trigger =
      currentIndex !== NO_INDEX ? triggerRefs.current[currentIndex] : null;
    closeMenu();
    trigger?.focus();
  };

  // Keyboard focus leaving the menu closes it (not while the pointer is over it)
  const onWrapperBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;

    if (!isOpen || pointerInsideRef.current) {
      return;
    }

    if (!next || !event.currentTarget.contains(next)) {
      scheduleClose();
    }
  };

  // Initial panel open
  useIsomorphicLayoutEffect(() => {
    if (!isOpen || currentIndex === NO_INDEX || !panelRef.current || !viewportRef.current) {
      return;
    }

    if (!currentPaneRef.current) {
      return;
    }

    gsap.killTweensOf([menuPanelRef.current, panelRef.current, viewportRef.current]);

    const contentHeight = getPaneHeight(currentPaneRef.current);

    if (!hasOpenedOnceRef.current) {
      if (prefersReducedMotion()) {
        gsap.set(menuPanelRef.current, {
          height: "auto",
          opacity: 0,
        });

        gsap.set(viewportRef.current, {
          height: contentHeight,
          opacity: 1,
        });

        gsap.to(menuPanelRef.current, {
          opacity: 1,
          duration: REDUCED_MOTION_FADE_DURATION,
          ease: "power2.out",
          onComplete: () => {
            hasOpenedOnceRef.current = true;
          },
        });
        return;
      }

      gsap.set(menuPanelRef.current, {
        height: 0,
        opacity: 1,
      });

      gsap.set(viewportRef.current, {
        height: contentHeight,
        opacity: 0,
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          hasOpenedOnceRef.current = true;
          gsap.set(viewportRef.current, { height: contentHeight, opacity: 1 });
        },
      });

      timeline
        .to(
          menuPanelRef.current,
          {
            height: "auto",
            duration: config.heightDuration,
            ease: config.heightEase,
          },
          0
        )
        .to(
          viewportRef.current,
          {
            opacity: 1,
            duration: config.contentFadeDuration,
            ease: "power2.out",
          },
          config.contentFadeDelay
        );

      return;
    }

    gsap.set(viewportRef.current, {
      height: contentHeight,
    });
  }, [
    config.contentFadeDelay,
    config.contentFadeDuration,
    config.heightDuration,
    config.heightEase,
    currentIndex,
    isOpen,
  ]);

  // Sync static panel height
  useIsomorphicLayoutEffect(() => {
    if (currentIndex === NO_INDEX || nextIndex !== NO_INDEX) {
      return;
    }

    if (!currentPaneRef.current || !viewportRef.current) {
      return;
    }

    const height = getPaneHeight(currentPaneRef.current);
    gsap.set(viewportRef.current, { height });
  }, [currentIndex, nextIndex]);

  // Animate panel switch
  useIsomorphicLayoutEffect(() => {
    if (nextIndex === NO_INDEX) {
      return;
    }

    if (!currentPaneRef.current || !nextPaneRef.current || !viewportRef.current) {
      return;
    }

    const currentElement = currentPaneRef.current;
    const nextElement = nextPaneRef.current;
    const currentHeight = getPaneHeight(currentElement);
    const nextHeight = getPaneHeight(nextElement);
    const targetIndex = nextIndex;
    const direction = transitionDirectionRef.current;
    const distance = config.distance;

    isAnimatingRef.current = true;

    gsap.killTweensOf([currentElement, nextElement, viewportRef.current]);

    if (prefersReducedMotion()) {
      gsap.set(currentElement, {
        position: "absolute",
        inset: 0,
        x: 0,
        opacity: 0,
        zIndex: 1,
        pointerEvents: "none",
      });

      gsap.set(nextElement, {
        position: "absolute",
        inset: 0,
        x: 0,
        opacity: 1,
        zIndex: 2,
        pointerEvents: "none",
      });

      gsap.set(viewportRef.current, {
        height: nextHeight,
      });

      setCurrentIndex(targetIndex);
      setNextIndex(NO_INDEX);
      isAnimatingRef.current = false;
      visualIndexRef.current = targetIndex;

      const queuedIndex = queuedIndexRef.current;
      queuedIndexRef.current = NO_INDEX;

      if (
        queuedIndex !== NO_INDEX &&
        queuedIndex !== targetIndex &&
        items[queuedIndex] &&
        hasDropdownContent(items[queuedIndex])
      ) {
        requestSwitch(queuedIndex);
      }

      return;
    }

    gsap.set(currentElement, {
      position: "absolute",
      inset: 0,
      x: 0,
      opacity: 1,
      zIndex: 1,
      pointerEvents: "none",
    });

    gsap.set(nextElement, {
      position: "absolute",
      inset: 0,
      x: direction > 0 ? distance : -distance,
      opacity: config.fade ? 0 : 1,
      zIndex: 2,
      pointerEvents: "none",
    });

    gsap.set(viewportRef.current, {
      height: currentHeight,
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(targetIndex);
        setNextIndex(NO_INDEX);
        isAnimatingRef.current = false;
        visualIndexRef.current = targetIndex;

        const queuedIndex = queuedIndexRef.current;
        queuedIndexRef.current = NO_INDEX;

        if (
          queuedIndex !== NO_INDEX &&
          queuedIndex !== targetIndex &&
          items[queuedIndex] &&
          hasDropdownContent(items[queuedIndex])
        ) {
          requestSwitch(queuedIndex);
        }
      },
    });

    timeline
      .to(
        viewportRef.current,
        {
          height: nextHeight,
          duration: config.heightDuration,
          ease: config.heightEase,
        },
        0
      )
      .to(
        currentElement,
        {
          x: direction > 0 ? -distance : distance,
          opacity: config.fade ? 0 : 1,
          duration: config.duration,
          ease: config.ease,
        },
        0
      )
      .to(
        nextElement,
        {
          x: 0,
          opacity: 1,
          duration: config.duration,
          ease: config.ease,
        },
        0
      );
  }, [config.distance, config.duration, config.ease, config.fade, config.heightDuration, config.heightEase, items, nextIndex]);

  // Cleanup and close event listener
  useEffect(() => {
    const panel = panelRef.current;
    const viewport = viewportRef.current;
    const currentPane = currentPaneRef.current;
    const nextPane = nextPaneRef.current;

    const handleExternalClose = () => {
      closeMenu();
    };

    window.addEventListener("closeDirectionalMenu", handleExternalClose);

    return () => {
      window.removeEventListener("closeDirectionalMenu", handleExternalClose);
      clearCloseTimer();
      gsap.killTweensOf(panel);
      gsap.killTweensOf(viewport);
      gsap.killTweensOf([currentPane, nextPane]);
    };
  }, []);

  const expandedIndex = nextIndex !== NO_INDEX ? nextIndex : currentIndex;
  const triggerClassName =
    "relative flex cursor-pointer items-center gap-1 rounded-md text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-50 hidden @lg:block"
      onMouseEnter={onWrapperMouseEnter}
      onMouseLeave={onWrapperMouseLeave}
      onKeyDown={onWrapperKeyDown}
      onBlur={onWrapperBlur}
    >
      <nav aria-label="Main" className="flex h-full items-center justify-center">
        <ul className="pointer-events-auto flex items-center gap-6 @3xl:gap-8">
          {items.map((item, index) => {
            const isActive = highlightedIndex === index;
            const color = isActive ? activeColor : inactiveColor;
            // Theme tokens unless a colour is passed
            const stateClassName = color
              ? ""
              : isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground";

            if (!hasDropdownContent(item)) {
              return (
                <li key={item.label || index}>
                  <a
                    href={item.href ?? "#"}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick(e);
                      }
                    }}
                    onMouseEnter={() => onItemEnter(index)}
                    style={color ? { color } : undefined}
                    className={`${triggerClassName} ${stateClassName}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            }

            return (
              <li key={item.label || index}>
                <button
                  ref={(element) => {
                    triggerRefs.current[index] = element;
                  }}
                  type="button"
                  aria-expanded={isOpen && expandedIndex === index}
                  aria-controls={panelId}
                  onMouseEnter={() => onItemEnter(index)}
                  onClick={() => requestSwitch(index)}
                  style={color ? { color } : undefined}
                  className={`${triggerClassName} ${stateClassName}`}
                >
                  {item.label}
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-300 motion-reduce:rotate-0 motion-reduce:transition-none ${isActive ? "-rotate-180" : "rotate-0"}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {isOpen && currentIndex !== NO_INDEX && hasDropdownContent(items[currentIndex]) && (
        <div
          className="absolute inset-x-3 @3xl:inset-x-0"
          style={{ top: `calc(100% + ${panelGap}px)` }}
        >
          <div
            ref={menuPanelRef}
            id={panelId}
            role="region"
            aria-label={items[currentIndex]?.label}
            className="pointer-events-auto w-full overflow-hidden"
          >
            <div
              ref={panelRef}
              className="w-full transform-gpu overflow-hidden rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-[0_20px_60px_rgba(0,0,0,0.08)] @3xl:rounded-3xl @3xl:p-8"
            >
              <div ref={viewportRef} className="relative">
                <div
                  key={`current-${currentIndex}`}
                  ref={currentPaneRef}
                  className="relative w-full"
                >
                  {items[currentIndex]?.customContent || null}
                </div>

                {nextIndex !== NO_INDEX && hasDropdownContent(items[nextIndex]) && (
                  <div
                    key={`next-${nextIndex}`}
                    ref={nextPaneRef}
                    className="absolute left-0 top-0 w-full"
                  >
                    {items[nextIndex]?.customContent || null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Mobile: accordion panel ----

function MobileDirectionalMenu({ items }: { items: DirectionalMenuItem[] }) {
  const panelId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveIndex(null);
  };

  // Trap focus across the toggle + panel while open, restore it on close.
  useFocusTrap({
    active: isMenuOpen,
    containerRef,
    initialFocusRef: toggleButtonRef,
    onEscape: closeMenu,
  });

  // Tapping outside closes
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isMenuOpen]);

  const onToggleMenu = () => {
    setIsMenuOpen((currentValue) => {
      const nextValue = !currentValue;

      if (!nextValue) {
        setActiveIndex(null);
      }

      return nextValue;
    });
  };

  const onToggleSection = (index: number) => {
    setActiveIndex((currentValue) => (currentValue === index ? null : index));
  };

  return (
    <div ref={containerRef} className="flex items-center @lg:hidden">
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={onToggleMenu}
        className="flex h-10 w-10 items-center justify-center rounded-full text-foreground outline-none transition-colors duration-200 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        aria-expanded={isMenuOpen}
        aria-controls={panelId}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      <div
        id={panelId}
        inert={!isMenuOpen}
        className={`absolute inset-x-3 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-lg transition-all duration-300 ease-in-out motion-reduce:transition-none ${
          isMenuOpen
            ? "max-h-[80vh] overflow-y-auto border-border p-3 opacity-100"
            : "pointer-events-none max-h-0 border-transparent p-0 opacity-0"
        }`}
      >
        <div className="flex flex-col">
          {items.map((item, index) => {
            const isOpen = activeIndex === index;

            if (!hasDropdownContent(item)) {
              return (
                <a
                  key={item.label}
                  href={item.href ?? "#"}
                  className="rounded-lg px-3 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground outline-none transition-colors duration-300 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                  onClick={(e) => {
                    closeMenu();
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick(e);
                    }
                  }}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <section key={item.label} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => onToggleSection(index)}
                  className="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {item.label}
                  </span>

                  <ChevronDownIcon
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ease-in-out motion-reduce:rotate-0 motion-reduce:transition-none ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  inert={!isOpen}
                  className={`overflow-hidden transition-all duration-300 ease-in-out motion-reduce:transition-none ${
                    isOpen ? "max-h-[60rem] px-3 pb-5 opacity-100" : "max-h-0 px-3 opacity-0"
                  }`}
                >
                  {/* Panel grids collapse to one column on small screens */}
                  <div className="[&_.grid]:grid-cols-1">{item.customContent}</div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export interface DirectionalMenuProps {
  /** Menu entries. Items with `customContent` open a panel; others are links. */
  items: DirectionalMenuItem[];
  /** Brand slot on the left. */
  logo?: ReactNode;
  /** Right-hand slot (e.g. sign-in / CTA), shown on wider layouts. */
  actions?: ReactNode;
  /** Trigger color while its panel is active. Defaults to the foreground token. */
  activeColor?: string;
  /** Trigger color at rest. Defaults to the muted-foreground token. */
  inactiveColor?: string;
  /** Gap between the bar and the panel, px. */
  panelGap?: number;
  /** Delay before the panel closes once the pointer leaves, ms. */
  closeDelay?: number;
  /** Slide and resize duration, s. */
  duration?: number;
  /** How far panel content slides when switching, px. */
  distance?: number;
  className?: string;
}

export default function DirectionalMenu({
  items = [],
  logo,
  actions,
  activeColor,
  inactiveColor,
  panelGap = 20,
  closeDelay = 80,
  duration = 0.35,
  distance = 100,
  className = "",
}: DirectionalMenuProps) {
  const config = useMemo<MegaMenuConfig>(
    () => ({
      contentFadeDelay: CONTENT_FADE_DELAY,
      contentFadeDuration: CONTENT_FADE_DURATION,
      distance,
      duration,
      ease: MENU_EASE,
      fade: true,
      heightDuration: duration,
      heightEase: MENU_EASE,
    }),
    [distance, duration]
  );

  return (
    <header
      className={cn(
        "@container relative z-50 w-full border-b border-border bg-background text-foreground",
        className
      )}
    >
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 @3xl:h-19 @3xl:px-6">
        <div className="flex shrink-0 items-center">{logo}</div>

        <DirectionalMegaMenu
          items={items}
          config={config}
          closeDelay={closeDelay}
          panelGap={panelGap}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
        />

        <div className="flex items-center gap-2">
          {actions ? (
            <div className="hidden items-center gap-2 @3xl:flex">{actions}</div>
          ) : null}
          <MobileDirectionalMenu items={items} />
        </div>
      </div>
    </header>
  );
}

// --- Demo Export ---
const demoSettings = {
  duration: 0.35,
  distance: 100,
  closeDelay: 80,
  panelGap: 20,
  activeColor: "#0a0a0a",
  inactiveColor: "#737373",
};

const DEMO_PRODUCT_LINKS = [
  { label: "Overview", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "Documentation", href: "#" },
];

const DEMO_PREVIEW_IMAGES = [
  {
    alt: "Dashboard preview",
    src: "https://cdn.21st.dev/assets/mirror/1e/1e4a66a9c43bf24af52e65fb43602d5c497beb96ffc40fa4ad7b1eeabb879812.jpg",
  },
  {
    alt: "Product showcase",
    src: "https://cdn.21st.dev/assets/mirror/ef/ef696854debc5d2d40cbe03ea0c3a04e29689529cf2f4bfe90c1c5978f00579a.jpg",
  },
];

const DEMO_SOLUTION_BLOCKS = [
  {
    title: "Startups",
    description:
      "Launch faster with flexible infrastructure, simple onboarding, and scalable workflows.",
    href: "#",
  },
  {
    title: "Enterprise",
    description:
      "Bring governance, performance, and operational control to complex digital systems.",
    href: "#",
  },
  {
    title: "Agencies",
    description:
      "Build repeatable client delivery with modular systems, collaboration, and speed.",
    href: "#",
  },
];

const DEMO_LINK_GROUPS = [
  {
    heading: "Documentation",
    links: ["API Reference", "Guides", "Examples"],
  },
  {
    heading: "Resources",
    links: ["Changelog", "Community", "Support"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Contact"],
  },
];

const demoLinkClassName =
  "rounded-lg outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none";

function DemoProductsPanel() {
  return (
    <div className="flex flex-col gap-6 @4xl:flex-row @4xl:justify-between @4xl:gap-8">
      <div className="flex flex-col gap-5 @4xl:w-[65%]">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Product navigation
          </p>
          <h3 className="text-xl font-semibold text-foreground @3xl:text-2xl">
            Explore the product suite
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 @2xl:grid-cols-2 @4xl:grid-cols-1 @4xl:gap-4">
          {DEMO_PRODUCT_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`${demoLinkClassName} flex flex-col gap-1 border border-border p-4 hover:bg-accent`}
            >
              <span className="text-base font-medium text-foreground @3xl:text-lg">
                {item.label}
              </span>
              <span className="text-sm text-muted-foreground">
                Learn more about {item.label.toLowerCase()}.
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="hidden flex-col justify-end gap-4 @4xl:flex @4xl:w-[30%]">
        {DEMO_PREVIEW_IMAGES.map((image) => (
          <div key={image.src} className="h-54 overflow-hidden rounded-lg">
            <img
              src={image.src}
              alt={image.alt}
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoSolutionsPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Solutions
        </p>
        <h3 className="text-xl font-semibold text-foreground @3xl:text-2xl">
          Built for different teams
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 @2xl:grid-cols-3 @2xl:gap-6">
        {DEMO_SOLUTION_BLOCKS.map((block) => (
          <a
            key={block.title}
            href={block.href}
            className={`${demoLinkClassName} flex flex-col gap-2 border border-border p-4 hover:bg-accent @2xl:gap-3 @2xl:p-6`}
          >
            <h4 className="text-base font-semibold text-foreground @3xl:text-lg">
              {block.title}
            </h4>
            <p className="text-sm leading-6 text-muted-foreground">{block.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function DemoDevelopersPanel() {
  return (
    <div className="grid grid-cols-3 gap-6 @3xl:gap-10">
      {DEMO_LINK_GROUPS.map((group) => (
        <div key={group.heading} className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground @3xl:text-sm">
            {group.heading}
          </h4>

          <div className="flex flex-col gap-3">
            {group.links.map((label) => (
              <a
                key={label}
                href="#"
                className={`${demoLinkClassName} block text-sm font-medium text-muted-foreground hover:text-foreground`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DirectionalMenuDemo(props: Partial<typeof demoSettings>) {
  const s = { ...demoSettings, ...props };
  const themed = (key: "activeColor" | "inactiveColor") =>
    s[key] === demoSettings[key] ? undefined : s[key];

  const demoItems: DirectionalMenuItem[] = [
    { label: "Products", customContent: <DemoProductsPanel /> },
    { label: "Solutions", customContent: <DemoSolutionsPanel /> },
    { label: "Developers", customContent: <DemoDevelopersPanel /> },
    { label: "About", href: "#" },
  ];

  const demoLogo = (
    <a
      href="#"
      aria-label="Acme home"
      className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <rect width="28" height="28" rx="8" className="fill-foreground" />
        <path
          d="M9 9l5 5-5 5M15 9l5 5-5 5"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-background"
        />
      </svg>
      <span className="hidden text-base font-semibold tracking-tight text-foreground @3xl:inline">
        Acme
      </span>
    </a>
  );

  const demoActions = (
    <>
      <a
        href="#"
        className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        Sign in
      </a>
      <a
        href="#"
        className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Get started
      </a>
    </>
  );

  return (
    <div className="@container min-h-screen w-full bg-background text-foreground">
      <DirectionalMenu
        items={demoItems}
        logo={demoLogo}
        actions={demoActions}
        duration={s.duration}
        distance={s.distance}
        closeDelay={s.closeDelay}
        panelGap={s.panelGap}
        activeColor={themed("activeColor")}
        inactiveColor={themed("inactiveColor")}
      />

      <main className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 pb-24 pt-28 text-center @3xl:pt-40">
        <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
          Directional mega menu
        </span>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight @3xl:text-6xl">
          Menus that move the way you do.
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground @3xl:text-base">
          Hover across Products, Solutions and Developers. Each panel slides in
          from the side you&apos;re heading toward while the frame resizes to fit.
        </p>
      </main>
    </div>
  );
}
