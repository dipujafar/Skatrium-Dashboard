export const userAvatarInitials = (fullName?: string) => {
  if (!fullName) return ""

  return fullName
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
}