import * as Phaser from 'phaser';
import { unlockAudio } from './audio';
import { initInput, injectTap } from './input';
import { applyKeybinds } from './keybinds';
import { BootScene } from './render/art';
import { ControlsScene, GalleryScene, HelpScene, RecordsScene, SettingsScene } from './scenes/ExtrasScenes';
import { GameScene } from './scenes/GameScene';
import { LobbyScene } from './scenes/LobbyScene';
import { MenuScene } from './scenes/MenuScene';
import { StoryScene } from './scenes/StoryScene';
import { TitleScene } from './scenes/TitleScene';
import { VIEW } from './sim/constants';
import { initPwa } from './pwa';
import { initTouch } from './touch';

applyKeybinds();
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
  scene: [BootScene, TitleScene, MenuScene, GameScene, LobbyScene, StoryScene, SettingsScene, HelpScene, GalleryScene, RecordsScene, ControlsScene],
});

// Handy for debugging / automated smoke tests.
(window as unknown as { __game: Phaser.Game }).__game = game;
