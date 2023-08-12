import { ReactNode } from "react"

export const SectionLayout = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <section className="content-container" >
      { children }
    </section>
  )
}