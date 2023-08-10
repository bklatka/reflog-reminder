

export function parseTitle(title: string): [string, string] {
    const [ticketGroup, ticketId, ...description] = title
        .replaceAll('-', " ")
        .replaceAll("_", " ")
        .split(" ")

    return [`${ticketGroup}-${ticketId}`, description.join(" ")];
}