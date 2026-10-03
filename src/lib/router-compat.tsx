// Thin adapter so the Country Close components, written for react-router-dom,
// run on TanStack Router without rewriting every link. Only the APIs the app
// actually uses are provided: Link, NavLink, Outlet, useLocation, useNavigate.
import { forwardRef, type AnchorHTMLAttributes, type ComponentProps, type ReactNode } from "react";
import {
  Link as TanstackLink,
  Outlet,
  useLocation as useTanstackLocation,
  useNavigate as useTanstackNavigate,
} from "@tanstack/react-router";

export { Outlet };

const isExternal = (to: string) => to.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(to);

// Same matching rule react-router's NavLink uses: exact match, or a path
// segment prefix — except "/" which is only active on the home page.
const matchesPath = (pathname: string, to: string, end?: boolean) => {
  if (pathname === to) return true;
  if (end || to === "/") return false;
  return pathname.startsWith(to.endsWith("/") ? to : `${to}/`);
};

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export interface LinkProps extends AnchorProps {
  to: string;
  replace?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, replace, children, ...rest }, ref) => {
    if (isExternal(to)) {
      return (
        <a ref={ref} href={to} {...rest}>
          {children}
        </a>
      );
    }
    // Paths come from data arrays, so they can't be checked against the
    // generated route types here.
    const linkProps = {
      ...rest,
      to,
      ...(replace !== undefined ? { replace } : {}),
    } as unknown as ComponentProps<typeof TanstackLink>;
    return (
      <TanstackLink ref={ref} {...linkProps}>
        {children}
      </TanstackLink>
    );
  },
);
Link.displayName = "Link";

export interface NavLinkProps extends Omit<LinkProps, "className" | "children"> {
  end?: boolean;
  className?: string | ((state: { isActive: boolean }) => string);
  children?: ReactNode | ((state: { isActive: boolean }) => ReactNode);
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, end, className, children, ...rest }, ref) => {
    const { pathname } = useTanstackLocation();
    const isActive = !isExternal(to) && matchesPath(pathname, to, end);
    return (
      <Link
        ref={ref}
        to={to}
        aria-current={isActive ? "page" : undefined}
        className={typeof className === "function" ? className({ isActive }) : className}
        {...rest}
      >
        {typeof children === "function" ? children({ isActive }) : children}
      </Link>
    );
  },
);
NavLink.displayName = "NavLink";

export const useLocation = () => {
  const location = useTanstackLocation();
  return {
    pathname: location.pathname,
    search: location.searchStr,
    hash: location.hash ? `#${location.hash}` : "",
  };
};

export const useNavigate = () => {
  const navigate = useTanstackNavigate();
  return (to: string, options?: { replace?: boolean }) =>
    navigate({
      to: to as never,
      ...(options?.replace !== undefined ? { replace: options.replace } : {}),
    });
};
