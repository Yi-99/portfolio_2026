export function getActiveSection(sections, scrollY, viewportHeight) {
  const threshold = scrollY + viewportHeight * 0.35
  let activeSection = null

  for (const section of sections) {
    if (section.offsetTop <= threshold) activeSection = section.id
  }

  return activeSection
}
