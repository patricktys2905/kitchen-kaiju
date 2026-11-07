// Emotes: quick taunts shown in a bubble over your kaiju. EASY TO CUSTOMISE: edit the lists and keys here.

/** Each press shows the next emote in this list (players cycle through it). */
export const EMOTES = ['😂', '😤', '👋', '🔥', '😱', '🍴', '😋', '💪'];

/** Keys that send an emote: Keyboard Left, Keyboard Right. Gamepad: LT / L2 or BACK / SELECT. Phone: 😜 button. */
export const EMOTE_KEYS = ['KeyQ', 'Semicolon'];
export const EMOTE_PAD_BUTTONS = [6, 8];

/** Bots sometimes gloat after a knockout (0 = never). */
export const BOT_EMOTE_CHANCE = 0.25;

/** How long a bubble stays up (seconds), and the shortest gap between one player's emotes. */
export const EMOTE_TIME = 1.6;
export const EMOTE_COOLDOWN = 0.8;
