import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24 px-4">
      <Card className="max-w-3xl mx-auto border-none shadow-lg text-center">
        <CardHeader className="space-y-4">
          <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to Brew Your First Inspiration?
          </CardTitle>
          <CardDescription className="text-lg max-w-xl mx-auto">
            Join thousands of others starting their journey towards a more
            positive and focused mindset today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size="lg"
            className="rounded-full px-8 font-semibold transition-transform hover:scale-105 cursor-pointer"
          >
            <Link to="/inspirations">Explore Now!</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
