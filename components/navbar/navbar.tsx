"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Menu, Phone, Search, ShoppingBag, User, X } from "lucide-react";
import { company } from "@/data/company";
import { navigationLinks } from "@/data/navigation";
import { searchProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();

  const searchResults = searchQuery.length > 0 ? searchProducts(searchQuery).slice(0, 5) : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="border-b border-border">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
            <Link href="/" className="shrink-0">
              <Image src="/logo/logo.svg" alt={company.name} width={160} height={42} priority />
            </Link>

            <div ref={searchRef} className="relative hidden flex-1 max-w-xl md:block">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <button
                    type="submit"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
                    aria-label="Search products"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => setSearchOpen(true)}
                  />
                </div>
              </form>
              {searchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border border-border bg-white py-2 shadow-lg">
                  {searchResults.length > 0 ? (
                    <>
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded border border-border">
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40px" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{formatPrice(product.salePrice ?? product.price)}</p>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      No products found for &quot;{searchQuery}&quot;.
                    </div>
                  )}
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-muted"
                    onClick={() => {
                      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    View all results for &quot;{searchQuery}&quot;
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <a
                href={`tel:${company.phone.replace(/\D/g, "")}`}
                className="hidden items-center gap-1.5 text-sm text-muted-foreground hover:text-primary lg:flex"
              >
                <Phone className="h-4 w-4" />
                {company.phone}
              </a>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => {
                  setSearchOpen((prev) => !prev);
                  setMobileOpen(false);
                }}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/wishlist" aria-label="Wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <Link href="/profile" aria-label="Log in">
                  <User className="h-5 w-5" />
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart" aria-label="Cart">
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </Button>

              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {searchOpen && (
        <div className="border-b border-border bg-white md:hidden">
          <Container className="py-3">
            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div className="relative">
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Search products"
                >
                  <Search className="h-4 w-4" />
                </button>
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {searchQuery.trim().length > 0 && (
                <div className="rounded-md border border-border bg-white py-2 shadow-sm">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded border border-border">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{formatPrice(product.salePrice ?? product.price)}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      No products found for &quot;{searchQuery}&quot;.
                    </div>
                  )}
                </div>
              )}
            </form>
          </Container>
        </div>
      )}

      <nav className="hidden border-b border-border lg:block">
        <Container>
          <ul className="flex items-center gap-1">
            {navigationLinks.map((link) => (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="block px-4 py-3.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
                {link.children && activeDropdown === link.label && (
                  <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-md border border-border bg-white py-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {mobileOpen && (
        <div className="border-b border-border bg-white lg:hidden">
          <Container className="py-4">
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <a href={`tel:${company.phone.replace(/\D/g, "")}`} className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              {company.phone}
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
