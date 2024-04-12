import { UUID } from "crypto";
import { v4 } from "uuid";
export const createUUID = v4 as () => UUID;
