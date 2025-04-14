import type { AttendeeCreateBody } from "./types";

interface IResponse {
  errorMessage: string;
}

function getErrorMessage(responseJson: IResponse) {
  return responseJson.errorMessage;
}

export async function attendeeCreate(body: AttendeeCreateBody) {
  const base =
    "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

  const response = await fetch(base, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = getErrorMessage(await response.json());
    throw new Error(errorMessage);
  }
}
