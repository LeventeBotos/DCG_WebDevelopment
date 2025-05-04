import Image from "next/image"
import Link from "next/link"
import { Award, BarChart3, Brain, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Alex Johnson",
      role: "Founder & CEO",
      bio: "PhD in Machine Learning with 15+ years of experience in AI and data science. Previously led data science teams at major tech companies.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sarah Williams",
      role: "Chief Data Scientist",
      bio: "Expert in predictive modeling and statistical analysis with a background in financial technology and risk assessment.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Chen",
      role: "Head of AI Research",
      bio: "Specializes in deep learning and neural networks with multiple published papers on advanced AI applications in industry.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const values = [
    {
      icon: Brain,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with AI and data science.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work closely with our clients to ensure solutions that truly meet their needs.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We are committed to delivering the highest quality solutions and services.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Data Consulting Group</h1>
              <p className="text-muted-foreground md:text-xl">
                We are a team of data scientists, AI specialists, and industry experts dedicated to transforming
                businesses through innovative digital solutions. With a focus on the energy, banking, and manufacturing
                sectors, we leverage cutting-edge technology to solve complex challenges and drive sustainable growth.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Data Consulting Group team"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Company history"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-4">
              <div className="inline-block rounded-lg bg-primary p-2 text-primary-foreground">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
              <p className="text-muted-foreground">
                Founded in 2018, Data Consulting Group began with a simple mission: to help businesses harness the power
                of their data. What started as a small team of data scientists has grown into a comprehensive
                consultancy specializing in AI-driven solutions for industry leaders.
              </p>
              <p className="text-muted-foreground">
                Over the years, we've built a reputation for delivering innovative, effective solutions that drive real
                business results. Our team combines deep technical expertise with industry knowledge to create custom
                solutions that address our clients' unique challenges.
              </p>
              <p className="text-muted-foreground">
                Today, we work with some of the UK's largest companies, helping them leverage AI and data science to
                optimize operations, reduce costs, and drive growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Our Values</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                The principles that guide our work and relationships with clients.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-background"
              >
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Our Team</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Meet the experts behind our innovative solutions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Work With Us?</h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Let's discuss how our AI and data solutions can help your organization thrive in the digital age.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
