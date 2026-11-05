import * as Phaser from 'phaser';
import { unlockAudio } from './audio';
import { initInput, injectTap } from './input';
import { BootScene } from './render/art';
import { GameScene } from './scenes/GameScene';
import { LobbyScene } from './scenes/LobbyScene';
import { MenuScene } from './scenes/MenuScene';
import { StoryScene } from './scenes/StoryScene';
import { TitleScene } from './scenes/TitleScene';
import { VIEW } from './sim/constants';
import { initPwa } from './pwa';
import { initTouch } from './touch';

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
  scene: [BootScene, TitleScene, MenuScene, GameScene, LobbyScene, StoryScene],
});

// Handy for debugging / automated smoke tests.
(window as unknown as { __game: Phaser.Game }).__game = game;
