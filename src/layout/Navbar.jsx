import { ModeToggle } from "@/style/ModeToggle";
import { IconNotebook } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <IconNotebook className="h-6 w-6" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              MindBrew
            </span>
            <span className="text-[11px] text-muted-foreground">
              Motivate Your Life
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <ModeToggle />
          <Button variant="secondary" asChild>
            <Link to="/faqs">FAQs</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
