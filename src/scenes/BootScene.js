import { TEX_QUEUE, generateTextures } from '../textures.js';
import { S } from '../config.js';

class BootScene extends Phaser.Scene {
    constructor() { super('BootScene'); }

    preload() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        this.cameras.main.setBackgroundColor('#0a0a0a');

        const title = this.add.text(cx, cy - 80 * S, 'MANI', {
            fontSize: `${Math.round(60 * S)}px`, fontFamily: 'monospace', color: '#ff6600',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.tweens.add({
            targets: title, alpha: 0.3, duration: 200,
            yoyo: true, repeat: 2, onComplete: () => title.setAlpha(1)
        });

        const messages = [
            'Bribing the guards...',
            'Sharpening the spoon...',
            'Memorizing patrol routes...',
            'Hiding contraband...',
            'Checking for cameras...',
            'Loosening the vent screws...',
        ];
        const msgText = this.add.text(cx, cy + 10 * S, messages[0], {
            fontSize: `${Math.round(14 * S)}px`, fontFamily: 'monospace', color: '#888888',
            fontStyle: 'italic'
        }).setOrigin(0.5);
        let msgIdx = 0;
        this.time.addEvent({
            delay: 600, repeat: messages.length - 1,
            callback: () => {
                msgIdx++;
                if (msgIdx < messages.length) msgText.setText(messages[msgIdx]);
            }
        });

        const barW = 240 * S, barH = 8 * S;
        this.add.rectangle(cx, cy + 50 * S, barW + 4 * S, barH + 4 * S, 0x333344).setOrigin(0.5);
        const progressBar = this.add.rectangle(
            cx - barW/2, cy + 50 * S, 0, barH, 0xff6600
        ).setOrigin(0, 0.5);

        for (let i = 0; i < 12; i++) {
            const bar = this.add.rectangle(
                cx - 200 * S + i * 36 * S, cy, 3 * S, 300 * S, 0x333344, 0.15
            );
            this.tweens.add({
                targets: bar, alpha: 0.05, duration: 400,
                yoyo: true, repeat: -1, delay: i * 60
            });
        }

        this.load.on('progress', (v) => {
            progressBar.width = barW * v;
        });

        generateTextures(this);
        TEX_QUEUE.forEach(({ key, dataUrl }) => {
            this.load.image(key, dataUrl);
        });
        TEX_QUEUE.length = 0;
    }

    create() {
        this.cameras.main.fade(300, 0, 0, 0);
        this.time.delayedCall(300, () => this.scene.start('MenuScene'));
    }
}

export default BootScene;
