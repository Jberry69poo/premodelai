import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify, ChevronsUpDown } from "lucide-react";
import { PreModelLogo } from "./PreModelLogo";

export const CustomNavbar = () => {
  const {
    user,
    signOut
  } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <nav className="bg-background border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-2xl py-0 my-0 mx-0 px-[21px] flex items-center">
          <PreModelLogo size="sm" showText={false} />
          <span className="ml-2">PreModel.ai</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 navbar-links">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-2">
                    {/*<li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/#example1"
                          className="block p-3 rounded-md hover:bg-accent hover:text-accent-foreground focus:shadow-md"
                        >
                          <div className="font-medium leading-none">
                            Example 1
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            An example of a cool project.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                     </li>
                     <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/#example2"
                          className="block p-3 rounded-md hover:bg-accent hover:text-accent-foreground focus:shadow-md"
                        >
                          <div className="font-medium leading-none">
                            Example 2
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Another example of a cool project.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                     </li>*/}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <a href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
            How it Works
          </a>
          <a href="#examples" className="text-sm font-medium transition-colors hover:text-primary">
            Examples
          </a>
          

          {isMounted && (user ? <Button size="sm" onClick={() => signOut()}>
                Sign Out
              </Button> : <Link to="/admin">
                
              </Link>)}
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <AlignJustify className="h-[1.2rem] w-[1.2rem] rotate-0 sm:rotate-0" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-64">
            <SheetHeader className="text-left">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explore and manage your account settings.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 flex flex-col space-y-2">
              <Link to="/" className="block py-2 hover:text-primary">
                Home
              </Link>
              <a href="#how-it-works" className="block py-2 hover:text-primary">
                How it Works
              </a>
              <a href="#examples" className="block py-2 hover:text-primary">
                Examples
              </a>
              <a href="#founder-section" className="block py-2 hover:text-primary">
                Meet Josh
              </a>
              {isMounted && (user ? <Button size="sm" onClick={() => signOut()}>
                    Sign Out
                  </Button> : <Link to="/admin">
                    <Button size="sm">Admin</Button>
                  </Link>)}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>;
};
