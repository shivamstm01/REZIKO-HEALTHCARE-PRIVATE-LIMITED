import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Quote, PlayCircle } from "lucide-react";
import { FadeIn } from "@/components/fade-in";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center py-20 px-4 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900/50 dark:to-slate-950">
        <div className="container max-w-4xl space-y-6">
          <FadeIn delay={100} direction="down" fullWidth={false}>
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4 mx-auto">
              Trusted Pharmaceutical Leaders
            </div>
          </FadeIn>

          <FadeIn delay={300} direction="up">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              WELCOME TO <span className="text-primary">REZIKO HEALTHCARE</span>
            </h1>
          </FadeIn>

          <FadeIn delay={500} direction="up">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We are a team of dedicated professionals in the pharmaceutical industry who believe in a cure for all at an affordable cost.
              Our vision is to become a leading global pharmaceutical company by providing high quality, affordable, and innovative therapeutic solutions for patients with diverse medical needs.
            </p>
          </FadeIn>

          <FadeIn delay={700} direction="up">
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Our Innovations in Action</h2>
              <p className="text-muted-foreground">Discover how our solutions impact lives.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Video 1 */}
            <FadeIn direction="left" delay={200}>
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl border bg-black aspect-video hover:scale-[1.02] transition-transform duration-500">
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster="/globe.svg"
                >
                  <source src="/pediatrics.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-2 pointer-events-none">
                  <PlayCircle className="w-3 h-3" /> Pediatrics Overview
                </div>
              </div>
            </FadeIn>

            {/* Video 2 */}
            <FadeIn direction="right" delay={200}>
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl border bg-black aspect-video hover:scale-[1.02] transition-transform duration-500">
                <video
                  controls
                  className="w-full h-full object-cover"
                >
                  <source src="/pedia-1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-2 pointer-events-none">
                  <PlayCircle className="w-3 h-3" /> Advanced Solutions
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 container mx-auto">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">User Reviews</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <FadeIn delay={200} direction="up">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-primary h-full">
              <CardHeader className="pb-2">
                <div className="flex gap-1 mb-2 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <CardTitle className="text-lg">Ravi Kumar</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <Quote className="absolute right-4 top-0 w-8 h-8 text-muted/20 rotate-180" />
                <p className="text-muted-foreground leading-relaxed italic">
                  "Excellent product quality. Loved the service!"
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Review 2 */}
          <FadeIn delay={400} direction="up">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-primary h-full">
              <CardHeader className="pb-2">
                <div className="flex gap-1 mb-2 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <CardTitle className="text-lg">Sneha Patil</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <Quote className="absolute right-4 top-0 w-8 h-8 text-muted/20 rotate-180" />
                <p className="text-muted-foreground leading-relaxed italic">
                  "Support was responsive and helpful. Highly recommend!"
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Review 3 */}
          <FadeIn delay={600} direction="up">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-primary h-full">
              <CardHeader className="pb-2">
                <div className="flex gap-1 mb-2 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <CardTitle className="text-lg">Aman Verma</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <Quote className="absolute right-4 top-0 w-8 h-8 text-muted/20 rotate-180" />
                <p className="text-muted-foreground leading-relaxed italic">
                  "Fast delivery and very well-packed items."
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center container border-t">
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
