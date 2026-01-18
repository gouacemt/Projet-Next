"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-2xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Manage your projects <span className="text-primary">easily</span>
          </h1>

          <p className="text-muted-foreground text-lg">
            A simple SaaS to create projects, track progress, and manage your
            subscription.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/register">Get Started</Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to run your SaaS
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-background p-6 text-center space-y-3">
              <h3 className="font-semibold text-lg">Project Management</h3>
              <p className="text-muted-foreground text-sm">
                Create and manage your projects from a simple and intuitive dashboard.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6 text-center space-y-3">
              <h3 className="font-semibold text-lg">Secure Authentication</h3>
              <p className="text-muted-foreground text-sm">
                JWT-based authentication with protected routes and secure sessions.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6 text-center space-y-3">
              <h3 className="font-semibold text-lg">Subscription Access</h3>
              <p className="text-muted-foreground text-sm">
                Unlock premium features with Stripe-powered subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}