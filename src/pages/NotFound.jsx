import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconHome,
  IconArrowLeft,
  IconAlertTriangle,
} from "@tabler/icons-react";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 ~ MindBrew";
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <Card className="backdrop-blur-xl shadow-2xl shadow-primary/5">
          <CardHeader className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
              <IconAlertTriangle
                className="h-10 w-10 text-destructive"
                stroke={1.5}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest text-primary/60">
                Error 404
              </p>
              <CardTitle className="text-4xl font-black tracking-tight text-foreground">
                Page Not Found
              </CardTitle>
            </div>

            <CardDescription className="mt-4 text-base text-muted-foreground leading-relaxed">
              We couldn't find the page you're looking for. It might have been
              moved, or perhaps it never existed in this realm.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center px-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="flex-1 h-12 text-md font-bold shadow-lg shadow-primary/20 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <IconHome className="h-5 w-5" />
              Go Home
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-12 font-semibold border-border/60 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <IconArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
