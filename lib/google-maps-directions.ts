/** URL `travelmode` values for Google Maps web (matches JS API TravelMode). */
export type GoogleMapsWebTravelMode = "driving" | "transit" | "walking" | "bicycling";

/**
 * Opens Google Maps directions in the browser (no API key). User can set origin in Maps for ETA.
 * @see https://developers.google.com/maps/documentation/urls/get-started
 */
export function googleMapsDirectionsWebUrl(params: {
  destination: string;
  travelMode: GoogleMapsWebTravelMode;
  origin?: string;
}): string {
  const u = new URL("https://www.google.com/maps/dir/?api=1");
  u.searchParams.set("destination", params.destination);
  if (params.origin?.trim()) u.searchParams.set("origin", params.origin.trim());
  u.searchParams.set("travelmode", params.travelMode);
  return u.toString();
}
