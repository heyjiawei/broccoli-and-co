import type { AttendeeCreateBody } from "./types";

export async function attendeeCreate(body: AttendeeCreateBody) {
  const base =
    "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

  const response = await fetch(base, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const result = await response.json();
  console.log(`attendeeCreate::response: ${result}`);
  return result;
}
