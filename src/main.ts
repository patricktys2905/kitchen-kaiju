import * as Phaser from 'phaser';
import { BotBrain } from './sim/bot';
import { unlockAudio } from './audio';
import { initInput, injectTap } from './input';
import { applyKeybinds } from './keybinds';
import { applyCustomTables } from './custom';
import { BootScene } from './render/art';
import { ControlsScene, PadControlsScene, GalleryScene, HelpScene, PantryScene, RecordsScene, SettingsScene, TrialsScene } from './scenes/ExtrasScenes';
import { GameScene } from './scenes/GameScene';
import { LobbyScene } from './scenes/LobbyScene';
import { MenuScene } from './scenes/MenuScene';
import { StoryScene } from './scenes/StoryScene';
import { TitleScene } from './scenes/TitleScene';
import { WorkshopScene } from './scenes/WorkshopScene';
import { VIEW } from './sim/constants';
import { initPwa } from './pwa';
import { initTouch } from './touch';

applyKeybinds();
applyCustomTables();
initInput(unlockAudio);
initTouch(injectTap);
initPwa();

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'app',
  backgroundColor: '#140e0a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: VIEW.w,
    height: VIEW.h,
  },
  render: { antialias: true },
  scene: [BootScene, TitleScene, MenuScene, GameScene, LobbyScene, StoryScene, SettingsScene, HelpScene, GalleryScene, RecordsScene, ControlsScene, PadControlsScene, WorkshopScene, PantryScene, TrialsScene],
});

// Handy for debugging / automated smoke tests.
(window as unknown as { __game: Phaser.Game }).__game = game;
// playtest harness hooks (scripts/playtest): bot brains + a speed multiplier
(window as unknown as { __BotBrain: typeof BotBrain }).__BotBrain = BotBrain;
