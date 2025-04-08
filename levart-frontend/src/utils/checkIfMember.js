export default function isMemberOfGroup(members, loggedInId) {
  return members.some((member) => member.id === loggedInId);
}
