import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center py-20 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-primary mb-6 animate-in">
          Innovating Healthcare <br className="hidden sm:inline" /> for a Better Future
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mb-8 animate-in delay-100 opacity-0 fill-mode-forwards">
          Reziko Healthcare brings you advanced medical devices and supplements to ensure your well-being.
        </p>
        <div className="flex gap-4 animate-in delay-200 opacity-0 fill-mode-forwards">
          <Button size="lg" asChild>
            <Link href="/products">Explore Products</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Reziko?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="animate-in delay-100 opacity-0 fill-mode-forwards">
              <CardHeader>
                <CardTitle>Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our products serve the highest standards of safety and efficacy, tested by experts.
                </p>
              </CardContent>
            </Card>
            <Card className="animate-in delay-200 opacity-0 fill-mode-forwards">
              <CardHeader>
                <CardTitle>Advanced Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Leveraging the latest in medical technology to provide accurate and reliable solutions.
                </p>
              </CardContent>
            </Card>
            <Card className="animate-in delay-300 opacity-0 fill-mode-forwards">
              <CardHeader>
                <CardTitle>Customer Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your health is our priority. We offer 24/7 support and guidance for all our products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center container">
        <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
        <p className="text-muted-foreground mb-8 max-w-[600px] mx-auto">
          We are always looking for passionate individuals to join our mission. Check out our career opportunities.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/career">View Openings</Link>
        </Button>
      </section>
    </div>
  );
}
