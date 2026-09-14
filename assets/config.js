// assets/config.js — shared Azure Blob Storage configuration for Cohort Log.
// Edit ONLY this file to wire the whole site (week.html + index.html) to Azure.
//
// Paste a CONTAINER-level SAS URL below, e.g.:
//   "https://<account>.blob.core.windows.net/<container>?<sas-token>"
//
// Required SAS permissions: Read + Write + Create ONLY — never List, never
// Delete. Read lets the site load a week's recap content (and check
// whether an edited version has been saved); Write/Create lets readers
// save their notes and lets an editor save recap edits, both as new or
// overwritten blobs. List/Delete are never needed because every blob name
// is already known ahead of time (from weeks.js), and nothing here should
// ever remove data from the container.
//
// Give the token a short, rotating expiry. This file ships in the public
// page source, so anyone who views source can read AND write to the
// container with it until it expires — treat the container as a shared,
// low-stakes scratchpad, not a secured CMS, and rotate the token
// regularly (e.g. weekly, alongside publishing a new week).
//
// The storage account's CORS rules must allow GET and PUT from this
// site's origin (e.g. https://<user>.github.io) or every fetch() call
// below will fail silently with a CORS error in the browser console —
// this is the most common reason loading or saving appears to do nothing.
//
// Blob layout inside the container:
//   content/<weekId>.json                  — a week's editable recap content
//   notes/<weekId>-<reader>-<timestamp>.txt — a reader's downloaded notes
const SITE_CONFIG = {
  AZURE_CONTAINER_SAS_URL: ""
};

// Builds a blob URL for a path inside the configured container, preserving
// the SAS query string. Returns null when Azure isn't configured.
function azureBlobUrl(path) {
  if (!SITE_CONFIG.AZURE_CONTAINER_SAS_URL) return null;
  var parts = SITE_CONFIG.AZURE_CONTAINER_SAS_URL.split("?");
  return parts[0].replace(/\/$/, "") + "/" + path + "?" + parts[1];
}
