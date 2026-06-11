export function getSessionId() {
  let id = sessionStorage.getItem("session_id");

  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("session_id", id);
  }

  return id;
}

// going to have to use guids as part of the api call, so might need to add an extra column to websites for guid name 
export function getSessionPayload() {
  const utm = JSON.parse(localStorage.getItem("utm") || "{}");

  return {
    sessionId: getSessionId(),

    landingPage: window.location.href,
    referrer: document.referrer,
    userAgent: navigator.userAgent,

    utmSource: utm.utm_source,
    utmMedium: utm.utm_medium,
    utmCampaign: utm.utm_campaign,
  };
}

export function getUTMParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    source: params.get("utm_source"),
    medium: params.get("utm_medium"),
    campaign: params.get("utm_campaign"),
  };
}