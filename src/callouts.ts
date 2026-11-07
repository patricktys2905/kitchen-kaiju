// Announcer callouts: big pop-up words for great moments. EASY TO CUSTOMISE: the words and timings here.
export const CALLOUTS = {
  enabled: true,
  multiWindow: 2.2, // seconds between KOs by the same kaiju to count as a multi-KO
  multi: ['', '', 'DOUBLE SKEWER!', 'TRIPLE TREAT!', 'QUAD-RUPLE DIP!', 'FULL BUFFET!!'], // index = KOs in the window
  first: 'FIRST BITE!', // the first knockout of the match
  streak: { 3: 'ON A ROLL!', 5: 'UNSTOPPABLE APPETITE!', 8: 'KITCHEN NIGHTMARE!' } as Record<number, string>, // KOs in a row without being knocked out
  revenge: 'REVENGE IS SWEET!', // knock out the kaiju that last knocked you out
};
