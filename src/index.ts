import { signJWT } from "@portive/jwt-utils"
import {
  AuthHeaderStruct,
  AuthPayloadStruct,
  AuthPrivateClaims,
} from "@portive/api-types"
import JWT from "jsonwebtoken"

/**
 * Takes an `apiKey` comprising of the parts separates by underscores. The
 * first part being a preamble checking that it starts with `PRTV`, the
 * second is the API key id, and the last pare is the API secret key.
 *
 * The key has these properties for a few reasons:
 *
 * 1. Easy to cut and paste. Double-click and underscores and alphanumeric
 *    are all selected.
 * 2. `PRTV` makes sure we haven't confused the API key with some other API key
 * 3. We encode it into one so that we don't need multiple environment vars
 *    to store the API key which also ensures the key id and secret key stay
 *    together.
 *
 * e.g. PRTV_xxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */
export function parseApiKey(apiKey: string) {
  const parts = apiKey.split("_")
  if (parts.length !== 3) {
    throw new Error(
      `Expected apiKey to split on _ into exactly 3 parts but is ${parts.length}`
    )
  }
  const [keyType, keyId, secretKey] = parts
  if (keyType !== "PRTV")
    throw new Error(
      `Expected first part of API key to be PRTV but is ${JSON.stringify(
        keyType
      )}`
    )
  return {
    keyType,
    keyId,
    secretKey,
  }
}

/**
 * Takes the API key id and the API secret key and merges them into a single
 * API key which includes the `PRTV` preamble.
 *
 * e.g. PRTV_xxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */
export function stringifyApiKey({
  keyId,
  secretKey,
}: {
  keyId: string
  secretKey: string
}) {
  return `PRTV_${keyId}_${secretKey}`
}

type ExpiresIn = JWT.SignOptions["expiresIn"]

/**
 * A lower level version of `generateAuth` which `generateAuth` uses.
 * Takes the `claims`, `keyId`, `secretKey` and `expiresIn` as separate
 * arguments to improve readability.
 *
 * Probably okay to merge this into `generateAuth` later.
 */
export function _generateAuthToken(
  claims: AuthPrivateClaims,
  {
    keyId,
    secretKey,
    expiresIn,
  }: {
    keyId: string // separate from options to prevent accidental inclusion in claims
    secretKey: string // separate from options to prevent accidental inclusion in claims
    expiresIn: ExpiresIn
  }
): string {
  const jwt = signJWT(claims, AuthPayloadStruct, AuthHeaderStruct, secretKey, {
    keyid: keyId,
    expiresIn,
  })
  return jwt
}

/**
 * Permissions includes both the private claims and the `expiresIn` value
 * for the JWT token. Think of it as the combination of Options for a
 * auth token.
 */
type AuthOptions = AuthPrivateClaims & { expiresIn: ExpiresIn }

/**
 * Takes an apiKey (which includes the `keyId` and `secretKey`) and a set of
 * PermitOptions and then generates a permit from it.
 */
export function generateAuthToken(
  apiKey: string,
  { expiresIn, ...claims }: AuthOptions // PermitPrivateClaims & { expiresIn: ExpiresIn }
) {
  const { keyId, secretKey } = parseApiKey(apiKey)
  return _generateAuthToken(claims, { keyId, secretKey, expiresIn })
}
