import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    return (
        <div className="container py-16">
            <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground mb-6">
                        Have questions about our products or services? Reach out to us and our team will get back to you shortly.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium">Address</h3>
                            <p className="text-sm text-muted-foreground">123 Health Ave, Wellness City, HC 10001</p>
                        </div>
                        <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-sm text-muted-foreground">support@reziko.com</p>
                        </div>
                        <div>
                            <h3 className="font-medium">Phone</h3>
                            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                    </div>
                </div>
                <div className="bg-muted/10 p-6 rounded-lg border">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="email@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="How can we help you?" />
                        </div>
                        <Button className="w-full">Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
