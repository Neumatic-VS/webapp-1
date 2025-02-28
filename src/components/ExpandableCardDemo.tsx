import { ProjectStatusCard } from "@/components/ui/expandable-card"

function ExpandableCardDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ProjectStatusCard
        title="Design System"
        progress={100}
        dueDate="Dec 31, 2023"
        venue={{
          name: "Instituto Tomie Ohtake",
          address: "Rua Coropé, 88, Pinheiros, São Paulo"
        }}
        invitationsSent={300}
        confirmations={280}
        capacity={300}
        openIssues={0}
      />

      <ProjectStatusCard
        title="Analytics Dashboard"
        progress={45}
        dueDate="Mar 1, 2024"
        venue={{
          name: "Centro de Convenções Frei Caneca",
          address: "Rua Frei Caneca, 569, Consolação, São Paulo"
        }}
        invitationsSent={500}
        confirmations={225}
        capacity={400}
        openIssues={8}
      />
    </div>
  )
}

export { ExpandableCardDemo };
