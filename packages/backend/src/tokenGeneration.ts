{
  /*import { Request, Response, NextFunction } from "express";
import { encode, TAlgorithm, decode } from "jwt-simple";

export interface User {
  id: number;
  dateCreated: number;
  username: string;
  password: string;
}

export interface Session {
  id: number;
  dateCreated: number;
  username: string;
  issued: number;
  expires: number;
}

export type PartialSession = Omit<Session, "issued" | "expires">;

export interface EncodeResult {
  token: string;
  expires: number;
  issued: number;
}

export type DecodeResult =
  | {
      type: "valid";
      session: Session;
    }
  | {
      type: "integrity-error";
    }
  | {
      type: "invalid-token";
    };

export type ExpirationStatus = "expired" | "active" | "grace";

export function encodeSession(
  secretKey: string,
  partialSession: PartialSession
): EncodeResult {
  // Always use HS512 to sign the token
  const algorithm: TAlgorithm = "HS512";
  // Determine when the token should expire
  const issued = Date.now();
  const fifteenMinutesInMs = 15 * 60 * 1000;
  const expires = issued + fifteenMinutesInMs;
  const session: Session = {
    ...partialSession,
    issued: issued,
    expires: expires,
  };

  return {
    token: encode(session, secretKey, algorithm),
    issued: issued,
    expires: expires,
  };
}

export function decodeSession(
  secretKey: string,
  tokenString: string
): DecodeResult {
  const algorithm: TAlgorithm = "HS512";

  let result: Session;

  try {
    result = decode(tokenString, secretKey, false, algorithm);
  } catch (_e) {
    const e: Error = _e;
    if (
      e.message === "No token supplied" ||
      e.message === "Not enough or too many segments"
    ) {
      return {
        type: "invalid-token",
      };
    }

    if (
      e.message === "Signature verification failed" ||
      e.message === "Algorithm not supported"
    ) {
      return {
        type: "integrity-error",
      };
    }

    // Handle json parse errors, thrown when the payload is nonsense
    if (e.message.indexOf("Unexpected token") === 0) {
      return {
        type: "invalid-token",
      };
    }

    throw e;
  }

  return {
    type: "valid",
    session: result,
  };
}

export function checkExpirationStatus(token: Session): ExpirationStatus {
  const now = Date.now();

  if (token.expires > now) return "active";

  // Find the timestamp for the end of the token's grace period
  const threeHoursInMs = 3 * 60 * 60 * 1000;
  const threeHoursAfterExpiration = token.expires + threeHoursInMs;

  if (threeHoursAfterExpiration > now) return "grace";

  return "expired";
}

var express = require("express");
/**
 * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
 */
  /*
export function requireJwtMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const SECRET_KEY_HERE: string =
    "skdjfsldk23flasdngsd8lkjasnjklasndfdfsgdfs39485880257345738ihdfhal";
  const unauthorized = (message: string) =>
    response.status(401).json({
      ok: false,
      status: 401,
      message: message,
    });

  const requestHeader = "X-JWT-Token";
  const responseHeader = "X-Renewed-JWT-Token";
  const header = request.header(requestHeader);

  if (!header) {
    unauthorized(`Required ${requestHeader} header not found.`);
    return;
  }

  const decodedSession: DecodeResult = decodeSession(SECRET_KEY_HERE, header);

  if (
    decodedSession.type === "integrity-error" ||
    decodedSession.type === "invalid-token"
  ) {
    unauthorized(
      `Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`
    );
    return;
  }

  const expiration: ExpirationStatus = checkExpirationStatus(
    decodedSession.session
  );

  if (expiration === "expired") {
    unauthorized(
      `Authorization token has expired. Please create a new authorization token.`
    );
    return;
  }

  let session: Session;

  if (expiration === "grace") {
    // Automatically renew the session and send it back with the response
    const { token, expires, issued } = encodeSession(
      SECRET_KEY_HERE,
      decodedSession.session
    );
    session = {
      ...decodedSession.session,
      expires: expires,
      issued: issued,
    };

    response.setHeader(responseHeader, token);
  } else {
    session = decodedSession.session;
  }

  // Set the session on response.locals object for routes to access
  response.locals = {
    ...response.locals,
    session: session,
  };

  // Request has a valid or renewed session. Call next to continue to the authenticated route handler
  next();
}
*/
}
