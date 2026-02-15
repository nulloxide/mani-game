import { T } from './config.js';

const TEX_QUEUE = [];
function tex(scene, key, w, h, draw) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    draw(ctx, w, h);
    TEX_QUEUE.push({ key, dataUrl: c.toDataURL() });
    c.width = 0; c.height = 0;
}

function generateTextures(scene) {
    tex(scene, 'wall', T, T, (ctx) => {
        ctx.fillStyle = '#2d2d3d';
        ctx.fillRect(0, 0, T, T);
        const stones = [
            [1,1,21,13], [24,1,23,13], [1,16,14,14], [17,16,14,14], [33,16,14,14]
        ];
        stones.forEach(([x,y,w,h], i) => {
            const v = 30 + (i * 7) % 20;
            const sg = ctx.createLinearGradient(x, y, x, y+h);
            sg.addColorStop(0, `rgb(${v+20},${v+17},${v+30})`);
            sg.addColorStop(1, `rgb(${v+10},${v+7},${v+20})`);
            ctx.fillStyle = sg;
            ctx.fillRect(x, y, w, h);
            ctx.fillStyle = 'rgba(255,255,255,0.10)';
            ctx.fillRect(x, y, w, 2);
            ctx.fillStyle = 'rgba(255,255,255,0.04)';
            ctx.fillRect(x, y+2, w, 1);
            ctx.fillStyle = 'rgba(0,0,0,0.28)';
            ctx.fillRect(x, y+h-2, w, 2);
            ctx.fillStyle = 'rgba(0,0,0,0.12)';
            ctx.fillRect(x, y+h-3, w, 1);
            ctx.fillStyle = 'rgba(255,255,255,0.04)';
            ctx.fillRect(x+1, y+1, 1, h-2);
            ctx.fillStyle = 'rgba(0,0,0,0.06)';
            ctx.fillRect(x+w-1, y+1, 1, h-2);
            for (let n = 0; n < 14; n++) {
                const nx = x + Math.random() * w;
                const ny = y + Math.random() * h;
                ctx.fillStyle = `rgba(${Math.random()>0.5?255:0},${Math.random()>0.5?255:0},${Math.random()>0.5?255:0},0.04)`;
                ctx.fillRect(nx, ny, 1+Math.random(), 1+Math.random());
            }
        });
        ctx.fillStyle = '#1a1a28';
        ctx.fillRect(0, 14, T, 3);
        ctx.fillRect(0, 31, T, 3);
        ctx.fillRect(22, 0, 3, T);
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 13, T, 1);
        ctx.fillRect(0, 30, T, 1);
        ctx.fillRect(21, 0, 1, T);
        if (Math.random() > 0.5) {
            ctx.fillStyle = 'rgba(40,80,30,0.35)';
            ctx.fillRect(2 + Math.random()*14, 28 + Math.random()*6, 6, 4);
            ctx.fillStyle = 'rgba(50,90,35,0.2)';
            ctx.fillRect(4 + Math.random()*10, 30 + Math.random()*4, 4, 3);
        }
        if (Math.random() > 0.6) {
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            const sx = 5 + Math.random()*38, sy = 5 + Math.random()*38;
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + Math.random()*8-4, sy + Math.random()*8-4);
            ctx.stroke();
        }
    });

    tex(scene, 'floor', T, T, (ctx) => {
        const g = ctx.createLinearGradient(0, 0, T, T);
        g.addColorStop(0, '#4e4e5c');
        g.addColorStop(0.5, '#4a4a58');
        g.addColorStop(1, '#464654');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, T, T);
        ctx.strokeStyle = 'rgba(0,0,0,0.18)';
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 0.5, T-1, T-1);
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.fillRect(1, 1, T-2, 1);
        ctx.fillRect(1, 1, 1, T-2);
        ctx.fillStyle = 'rgba(0,0,0,0.04)';
        ctx.fillRect(T-1, 1, 1, T-2);
        ctx.fillRect(1, T-1, T-2, 1);
        for (let i = 0; i < 24; i++) {
            const x = Math.random() * T;
            const y = Math.random() * T;
            ctx.fillStyle = `rgba(${45+Math.random()*20},${45+Math.random()*20},${55+Math.random()*20},0.4)`;
            ctx.fillRect(x, y, 1+Math.random()*3, 1+Math.random()*3);
        }
        if (Math.random() > 0.35) {
            ctx.strokeStyle = 'rgba(0,0,0,0.2)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            const sx = Math.random()*T, sy = Math.random()*T;
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + Math.random()*20-10, sy + Math.random()*20-10);
            ctx.lineTo(sx + Math.random()*15-7, sy + Math.random()*25-12);
            ctx.stroke();
        }
        if (Math.random() > 0.55) {
            ctx.fillStyle = 'rgba(60,50,40,0.18)';
            ctx.beginPath();
            ctx.arc(T/2+Math.random()*14-7, T/2+Math.random()*14-7, 5+Math.random()*6, 0, Math.PI*2);
            ctx.fill();
        }
        if (Math.random() > 0.7) {
            ctx.fillStyle = 'rgba(40,40,50,0.12)';
            ctx.fillRect(Math.random()*30, Math.random()*30, 3+Math.random()*6, 2+Math.random()*3);
        }
    });

    tex(scene, 'bars', T, T, (ctx) => {
        ctx.fillStyle = '#4e4e5c';
        ctx.fillRect(0, 0, T, T);
        for (let bx = 3; bx < T; bx += 10) {
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.fillRect(bx+5, 0, 3, T);
            const barG = ctx.createLinearGradient(bx, 0, bx+6, 0);
            barG.addColorStop(0, '#666677');
            barG.addColorStop(0.3, '#9999aa');
            barG.addColorStop(0.5, '#b0b0c0');
            barG.addColorStop(0.7, '#9999aa');
            barG.addColorStop(1, '#555566');
            ctx.fillStyle = barG;
            ctx.fillRect(bx, 0, 6, T);
            ctx.fillStyle = 'rgba(255,255,255,0.18)';
            ctx.fillRect(bx+2, 0, 1, T);
        }
        [7, 38].forEach(y => {
            ctx.fillStyle = '#555566';
            ctx.fillRect(0, y, T, 5);
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.fillRect(0, y, T, 1);
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            ctx.fillRect(0, y+4, T, 1);
            for (let rx = 5; rx < T; rx += 10) {
                ctx.fillStyle = '#888899';
                ctx.beginPath();
                ctx.arc(rx+3, y+2.5, 2, 0, Math.PI*2);
                ctx.fill();
                ctx.fillStyle = '#777788';
                ctx.beginPath();
                ctx.arc(rx+3, y+2.5, 1, 0, Math.PI*2);
                ctx.fill();
            }
        });
    });

    tex(scene, 'door_locked', T, T, (ctx) => {
        ctx.fillStyle = '#1a1a28';
        ctx.fillRect(0, 0, T, T);
        const dg = ctx.createLinearGradient(3, 0, 45, 0);
        dg.addColorStop(0, '#5a4a3a');
        dg.addColorStop(0.5, '#6a5a48');
        dg.addColorStop(1, '#4a3a2a');
        ctx.fillStyle = dg;
        ctx.fillRect(3, 1, 42, 46);
        ctx.fillStyle = '#4a3a28';
        ctx.fillRect(6, 4, 16, 18);
        ctx.fillRect(25, 4, 16, 18);
        ctx.fillRect(6, 26, 35, 17);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(6, 4, 16, 18);
        ctx.strokeRect(25, 4, 16, 18);
        ctx.strokeRect(6, 26, 35, 17);
        for (let gy = 28; gy < 42; gy += 4) {
            ctx.strokeStyle = 'rgba(0,0,0,0.08)';
            ctx.beginPath(); ctx.moveTo(7, gy); ctx.lineTo(40, gy+1); ctx.stroke();
        }
        ctx.fillStyle = '#888866';
        ctx.beginPath(); ctx.arc(36, 24, 5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#666644';
        ctx.beginPath(); ctx.arc(36, 24, 3.5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(35, 22, 2, 5);
        ctx.beginPath(); ctx.arc(36, 22, 2, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#cc2222';
        ctx.beginPath(); ctx.arc(36, 17, 3, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#ff4444';
        ctx.beginPath(); ctx.arc(35.5, 16.5, 1.2, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#555544';
        [8, 34].forEach(y => {
            ctx.fillRect(1, y, 4, 6);
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.fillRect(1, y, 4, 1);
            ctx.fillStyle = '#555544';
        });
        ctx.fillStyle = '#444433';
        ctx.beginPath(); ctx.arc(12, 10, 2.5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#333322';
        ctx.beginPath(); ctx.arc(12, 10, 1.5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.beginPath(); ctx.arc(11.5, 9.5, 0.8, 0, Math.PI*2); ctx.fill();
    });

    tex(scene, 'door_unlocked', T, T, (ctx) => {
        ctx.fillStyle = '#1a1a28';
        ctx.fillRect(0, 0, T, T);
        const dg = ctx.createLinearGradient(3, 0, 45, 0);
        dg.addColorStop(0, '#5a4a3a');
        dg.addColorStop(0.5, '#6a5a48');
        dg.addColorStop(1, '#4a3a2a');
        ctx.fillStyle = dg;
        ctx.fillRect(3, 1, 42, 46);
        ctx.fillStyle = '#4a3a28';
        ctx.fillRect(6, 4, 16, 18);
        ctx.fillRect(25, 4, 16, 18);
        ctx.fillRect(6, 26, 35, 17);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(6, 4, 16, 18);
        ctx.strokeRect(25, 4, 16, 18);
        ctx.strokeRect(6, 26, 35, 17);
        ctx.fillStyle = '#888866';
        ctx.beginPath(); ctx.arc(36, 24, 5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#22aa22';
        ctx.beginPath(); ctx.arc(36, 17, 3, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#44ff44';
        ctx.beginPath(); ctx.arc(35.5, 16.5, 1.2, 0, Math.PI*2); ctx.fill();
    });

    tex(scene, 'bed', T, T, (ctx) => {
        ctx.fillStyle = '#4e4e5c';
        ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(6, 8, 38, 36);
        ctx.fillStyle = '#5a4a38';
        ctx.fillRect(3, 5, 42, 36);
        ctx.strokeStyle = '#4a3a28';
        ctx.lineWidth = 1;
        ctx.strokeRect(3, 5, 42, 36);
        ctx.fillStyle = '#5a4a38';
        ctx.fillRect(5, 39, 4, 6);
        ctx.fillRect(39, 39, 4, 6);
        ctx.fillStyle = '#6a6a7a';
        ctx.fillRect(5, 8, 38, 30);
        const bg = ctx.createLinearGradient(5, 18, 5, 38);
        bg.addColorStop(0, '#556688');
        bg.addColorStop(1, '#445577');
        ctx.fillStyle = bg;
        ctx.fillRect(5, 18, 38, 20);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 0.5;
        [21, 26, 31].forEach(y => {
            ctx.beginPath(); ctx.moveTo(6, y); ctx.lineTo(42, y+1); ctx.stroke();
        });
        ctx.fillStyle = '#8899aa';
        ctx.beginPath();
        ctx.ellipse(24, 12, 15, 5, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.ellipse(21, 11, 9, 2.5, -0.2, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.beginPath();
        ctx.ellipse(24, 13, 8, 2, 0, 0, Math.PI*2);
        ctx.fill();
    });

    tex(scene, 'toilet', T, T, (ctx) => {
        ctx.fillStyle = '#4e4e5c';
        ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.ellipse(24, 32, 13, 10, 0, 0, Math.PI*2);
        ctx.fill();
        const tg = ctx.createLinearGradient(12, 3, 36, 3);
        tg.addColorStop(0, '#c8c8d8');
        tg.addColorStop(0.5, '#dddde8');
        tg.addColorStop(1, '#b8b8c8');
        ctx.fillStyle = tg;
        ctx.fillRect(13, 4, 22, 14);
        ctx.fillStyle = '#e0e0ea';
        ctx.fillRect(14, 2, 20, 3);
        ctx.fillStyle = '#999aaa';
        ctx.fillRect(30, 7, 5, 3);
        const bg = ctx.createLinearGradient(8, 14, 40, 14);
        bg.addColorStop(0, '#c0c0d0');
        bg.addColorStop(0.5, '#e0e0ea');
        bg.addColorStop(1, '#b0b0c0');
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.ellipse(24, 27, 13, 12, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#aab0c8';
        ctx.beginPath();
        ctx.ellipse(24, 28, 9, 8, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = 'rgba(100,140,200,0.3)';
        ctx.beginPath();
        ctx.ellipse(24, 29, 6, 5, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.strokeStyle = '#bbbbcc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(24, 27, 12, 10, 0, 0, Math.PI*2);
        ctx.stroke();
    });

    tex(scene, 'vent', T, T, (ctx) => {
        ctx.fillStyle = '#2d2d3d';
        ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = '#5a5a6a';
        ctx.fillRect(3, 3, 42, 42);
        ctx.fillStyle = '#3a3a4a';
        ctx.fillRect(6, 6, 36, 36);
        for (let y = 9; y < 40; y += 5) {
            const sg = ctx.createLinearGradient(7, y, 7, y+4);
            sg.addColorStop(0, '#555566');
            sg.addColorStop(1, '#2a2a3a');
            ctx.fillStyle = sg;
            ctx.fillRect(7, y, 34, 4);
            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            ctx.fillRect(7, y, 34, 1);
        }
        ctx.fillStyle = '#777788';
        [[7,7],[41,7],[7,41],[41,41]].forEach(([x,y]) => {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI*2);
            ctx.fill();
            ctx.strokeStyle = '#555566';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(x-2, y-2); ctx.lineTo(x+2, y+2);
            ctx.moveTo(x+2, y-2); ctx.lineTo(x-2, y+2);
            ctx.stroke();
        });
        ctx.strokeStyle = 'rgba(150,150,180,0.12)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(8, 14+i*8);
            ctx.quadraticCurveTo(24, 12+i*8+Math.random()*5, 40, 14+i*8);
            ctx.stroke();
        }
    });

    tex(scene, 'key', 36, 24, (ctx) => {
        ctx.clearRect(0, 0, 36, 24);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath(); ctx.arc(11, 13, 8, 0, Math.PI*2); ctx.fill();
        ctx.fillRect(18, 10, 16, 6);
        const kg = ctx.createRadialGradient(10, 10, 1, 10, 10, 9);
        kg.addColorStop(0, '#ffee66');
        kg.addColorStop(0.5, '#ddaa22');
        kg.addColorStop(1, '#aa7711');
        ctx.fillStyle = kg;
        ctx.beginPath(); ctx.arc(10, 10, 8, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.beginPath(); ctx.arc(10, 10, 4, 0, Math.PI*2); ctx.fill();
        const sg = ctx.createLinearGradient(17, 7, 17, 14);
        sg.addColorStop(0, '#ffdd44');
        sg.addColorStop(0.5, '#ccaa22');
        sg.addColorStop(1, '#aa8811');
        ctx.fillStyle = sg;
        ctx.fillRect(16, 7, 17, 6);
        ctx.fillRect(29, 13, 4, 4);
        ctx.fillRect(23, 13, 4, 4);
        ctx.fillStyle = 'rgba(255,255,200,0.3)';
        ctx.fillRect(17, 7, 15, 2);
    });

    tex(scene, 'hint', 36, 42, (ctx) => {
        ctx.clearRect(0, 0, 36, 42);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(5, 4, 29, 37);
        const pg = ctx.createLinearGradient(3, 1, 32, 42);
        pg.addColorStop(0, '#eeddaa');
        pg.addColorStop(0.5, '#e8d8a0');
        pg.addColorStop(1, '#d8c890');
        ctx.fillStyle = pg;
        ctx.fillRect(3, 1, 28, 38);
        ctx.fillStyle = '#d8c890';
        for (let y = 1; y < 39; y += 2) {
            ctx.fillRect(30 + Math.random()*3, y, 2, 2);
        }
        ctx.fillStyle = '#554433';
        for (let y = 8; y < 34; y += 4) {
            const w = 12 + Math.random() * 10;
            ctx.fillRect(7, y, w, 1.5);
        }
        ctx.fillStyle = 'rgba(180,40,40,0.4)';
        ctx.beginPath(); ctx.arc(20, 24, 5, 0, Math.PI*2); ctx.fill();
    });

    const dirs = ['down', 'up', 'left', 'right'];
    const addOutline = (ctx, w, h) => {
        const img = ctx.getImageData(0, 0, w, h);
        const out = ctx.createImageData(w, h);
        const d = img.data, o = out.data;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const i = (y * w + x) * 4;
                if (d[i+3] === 0) {
                    const neighbors = [[-1,0],[1,0],[0,-1],[0,1]];
                    for (const [dx,dy] of neighbors) {
                        const nx = x+dx, ny = y+dy;
                        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                            const ni = (ny * w + nx) * 4;
                            if (d[ni+3] > 128) { o[i]=10; o[i+1]=8; o[i+2]=15; o[i+3]=220; break; }
                        }
                    }
                }
            }
        }
        ctx.putImageData(out, 0, 0);
        ctx.putImageData(img, 0, 0);
    };
    dirs.forEach((dir) => {
        for (let frame = 0; frame < 3; frame++) {
            tex(scene, `player_${dir}_${frame}`, T, T, (ctx) => {
                ctx.clearRect(0, 0, T, T);
                const cx = 24;
                ctx.fillStyle = 'rgba(0,0,0,0.25)';
                ctx.beginPath(); ctx.ellipse(cx, 44, 10, 4, 0, 0, Math.PI*2); ctx.fill();
                const legOff = frame === 1 ? 3 : frame === 2 ? -3 : 0;
                ctx.fillStyle = '#3a3a40';
                ctx.fillRect(cx-7, 33+Math.max(0,legOff), 6, 10-Math.abs(legOff));
                ctx.fillRect(cx+1, 33+Math.max(0,-legOff), 6, 10-Math.abs(legOff));
                ctx.fillStyle = '#2a2a30';
                ctx.fillRect(cx-8, 41, 7, 4); ctx.fillRect(cx+1, 41, 7, 4);
                ctx.fillStyle = 'rgba(255,255,255,0.06)';
                ctx.fillRect(cx-8, 41, 7, 1);
                ctx.fillRect(cx+1, 41, 7, 1);
                ctx.fillStyle = '#222228';
                ctx.fillRect(cx-8, 44, 7, 1); ctx.fillRect(cx+1, 44, 7, 1);
                ctx.fillStyle = 'rgba(255,255,255,0.04)';
                ctx.fillRect(cx-6, 42, 1, 2); ctx.fillRect(cx+3, 42, 1, 2);
                const bg = ctx.createLinearGradient(cx-10, 17, cx+10, 17);
                bg.addColorStop(0, '#e05800'); bg.addColorStop(0.3, '#ff8830');
                bg.addColorStop(0.7, '#ff8830'); bg.addColorStop(1, '#cc4c00');
                ctx.fillStyle = bg; ctx.fillRect(cx-10, 16, 20, 19);
                ctx.fillStyle = '#f07020'; ctx.fillRect(cx-6, 14, 12, 4);
                if (dir === 'down') {
                    ctx.fillStyle = '#cc4c00';
                    ctx.fillRect(cx-4, 16, 2, 2);
                    ctx.fillRect(cx-4, 19, 2, 2);
                    ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.lineWidth = 0.5;
                    ctx.beginPath(); ctx.moveTo(cx, 18); ctx.lineTo(cx, 34); ctx.stroke();
                    ctx.fillStyle = '#e05800';
                    ctx.beginPath();
                    ctx.moveTo(cx-3, 14); ctx.lineTo(cx, 16); ctx.lineTo(cx+3, 14);
                    ctx.fill();
                    ctx.fillStyle = '#cc4c00';
                    ctx.fillRect(cx+3, 21, 5, 4);
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = 0.5;
                    ctx.strokeRect(cx+3, 21, 5, 4);
                }
                if (dir === 'left' || dir === 'right') {
                    const pocketX = dir === 'left' ? cx-4 : cx;
                    ctx.fillStyle = '#cc4c00';
                    ctx.fillRect(pocketX, 21, 5, 4);
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = 0.5;
                    ctx.strokeRect(pocketX, 21, 5, 4);
                }
                const armY = 18 + (frame === 1 ? 2 : frame === 2 ? -2 : 0);
                ctx.fillStyle = '#f07020';
                ctx.fillRect(cx-14, armY, 5, 12); ctx.fillRect(cx+9, armY, 5, 12);
                ctx.fillStyle = '#cc4c00';
                ctx.fillRect(cx-14, armY+10, 5, 2); ctx.fillRect(cx+9, armY+10, 5, 2);
                ctx.fillStyle = '#e8b888';
                ctx.fillRect(cx-14, armY+11, 5, 4); ctx.fillRect(cx+9, armY+11, 5, 4);
                if (dir === 'down') {
                    ctx.fillStyle = '#ffffff'; ctx.font = '8px monospace';
                    ctx.textAlign = 'center'; ctx.fillText('47', cx, 30);
                }
                ctx.fillStyle = '#333340';
                ctx.fillRect(cx-10, 33, 20, 3);
                ctx.fillStyle = '#888866';
                ctx.fillRect(cx-2, 33, 4, 3);
                const hg = ctx.createRadialGradient(cx, 9, 1, cx, 9, 9);
                hg.addColorStop(0, '#f0c8a0'); hg.addColorStop(1, '#d8a878');
                ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(cx, 9, 9, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = '#2a2015';
                if (dir === 'up') {
                    ctx.beginPath(); ctx.arc(cx, 8, 9, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = '#d8a878'; ctx.beginPath(); ctx.arc(cx, 11, 6, 0, Math.PI*2); ctx.fill();
                } else {
                    ctx.beginPath(); ctx.arc(cx, 6, 9, Math.PI, Math.PI*2); ctx.fill();
                    ctx.fillRect(cx-9, 3, 18, 4);
                }
                if (dir !== 'up') {
                    const eyeOff = dir === 'left' ? -3 : dir === 'right' ? 3 : 0;
                    ctx.fillStyle = '#3a2a18';
                    ctx.fillRect(cx-6+eyeOff, 6, 5, 1); ctx.fillRect(cx+1+eyeOff, 6, 5, 1);
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(cx-6+eyeOff, 7, 4, 3); ctx.fillRect(cx+2+eyeOff, 7, 4, 3);
                    const pupOff = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
                    ctx.fillStyle = '#445566';
                    ctx.fillRect(cx-5+eyeOff+pupOff, 8, 2, 2); ctx.fillRect(cx+3+eyeOff+pupOff, 8, 2, 2);
                    ctx.fillStyle = '#1a1a2a';
                    ctx.fillRect(cx-4+eyeOff+pupOff, 8, 1, 2); ctx.fillRect(cx+4+eyeOff+pupOff, 8, 1, 2);
                    ctx.fillStyle = '#bb8866';
                    ctx.fillRect(cx-2+Math.floor(eyeOff/2), 13, 4, 1);
                    ctx.fillStyle = '#cc7766';
                    ctx.fillRect(cx-1+Math.floor(eyeOff/2), 15, 3, 1);
                }
                if (dir === 'left' || dir === 'right') {
                    const earX = dir === 'left' ? cx+8 : cx-9;
                    ctx.fillStyle = '#d8a878';
                    ctx.fillRect(earX, 8, 2, 4);
                }
                addOutline(ctx, T, T);
            });
        }
    });

    dirs.forEach((dir, di) => {
        for (let frame = 0; frame < 3; frame++) {
            tex(scene, `guard_${dir}_${frame}`, T, T, (ctx) => {
                ctx.clearRect(0, 0, T, T);
                const cx = 24;

                ctx.fillStyle = 'rgba(0,0,0,0.25)';
                ctx.beginPath(); ctx.ellipse(cx, 44, 10, 4, 0, 0, Math.PI*2); ctx.fill();

                const legOff = frame === 1 ? 3 : frame === 2 ? -3 : 0;
                ctx.fillStyle = '#1a1a2a';
                ctx.fillRect(cx-7, 33+Math.max(0,legOff), 6, 10-Math.abs(legOff));
                ctx.fillRect(cx+1, 33+Math.max(0,-legOff), 6, 10-Math.abs(legOff));
                ctx.fillStyle = '#111118';
                ctx.fillRect(cx-8, 41, 7, 4);
                ctx.fillRect(cx+1, 41, 7, 4);
                ctx.fillStyle = 'rgba(255,255,255,0.05)';
                ctx.fillRect(cx-8, 41, 7, 1);
                ctx.fillRect(cx+1, 41, 7, 1);
                ctx.fillStyle = '#0a0a12';
                ctx.fillRect(cx-8, 44, 7, 1); ctx.fillRect(cx+1, 44, 1, 7);
                ctx.fillStyle = 'rgba(255,255,255,0.03)';
                ctx.fillRect(cx-6, 42, 1, 2); ctx.fillRect(cx+3, 42, 1, 2);

                const bg = ctx.createLinearGradient(cx-10, 17, cx+10, 17);
                bg.addColorStop(0, '#1a2a55');
                bg.addColorStop(0.3, '#223366');
                bg.addColorStop(0.7, '#223366');
                bg.addColorStop(1, '#152244');
                ctx.fillStyle = bg;
                ctx.fillRect(cx-10, 16, 20, 19);
                ctx.fillStyle = '#1e2e55';
                ctx.fillRect(cx-6, 14, 12, 4);

                ctx.fillStyle = '#2a3a66';
                ctx.fillRect(cx-10, 16, 4, 3);
                ctx.fillRect(cx+6, 16, 4, 3);
                ctx.fillStyle = '#ccaa44';
                ctx.fillRect(cx-10, 16, 4, 1);
                ctx.fillRect(cx+6, 16, 4, 1);

                if (dir === 'down') {
                    ctx.fillStyle = '#ccaa44';
                    ctx.beginPath();
                    ctx.moveTo(cx+4, 20); ctx.lineTo(cx+8, 23);
                    ctx.lineTo(cx+4, 26); ctx.lineTo(cx, 23);
                    ctx.closePath(); ctx.fill();
                    ctx.fillStyle = '#eedd66';
                    ctx.beginPath(); ctx.arc(cx+4, 23, 1.5, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = '#1a2a55';
                    ctx.fillRect(cx-5, 20, 4, 3);
                    ctx.fillStyle = '#dddde8';
                    ctx.fillRect(cx-8, 26, 7, 3);
                    ctx.fillStyle = '#333355';
                    ctx.fillRect(cx-7, 27, 5, 1);
                }
                if (dir === 'left' || dir === 'right') {
                    ctx.fillStyle = '#dddde8';
                    const ntX = dir === 'left' ? cx-3 : cx-3;
                    ctx.fillRect(ntX, 22, 6, 3);
                    ctx.fillStyle = '#333355';
                    ctx.fillRect(ntX+1, 23, 4, 1);
                }

                ctx.fillStyle = '#333340';
                ctx.fillRect(cx-10, 33, 20, 3);
                ctx.fillStyle = '#888866';
                ctx.fillRect(cx-2, 33, 4, 3);
                if (dir === 'down') {
                    ctx.fillStyle = '#444455';
                    ctx.fillRect(cx+5, 33, 3, 5);
                    ctx.fillStyle = '#333344';
                    ctx.fillRect(cx-8, 33, 3, 4);
                }

                const armY = 18 + (frame === 1 ? 2 : frame === 2 ? -2 : 0);
                ctx.fillStyle = '#1e2e55';
                ctx.fillRect(cx-14, armY, 5, 12);
                ctx.fillRect(cx+9, armY, 5, 12);
                ctx.fillStyle = '#152244';
                ctx.fillRect(cx-14, armY+10, 5, 2);
                ctx.fillRect(cx+9, armY+10, 5, 2);
                ctx.fillStyle = '#e8b888';
                ctx.fillRect(cx-14, armY+11, 5, 4);
                ctx.fillRect(cx+9, armY+11, 5, 4);

                if (dir === 'down' || dir === 'right') {
                    ctx.fillStyle = '#555555';
                    ctx.fillRect(cx+11, armY+7, 3, 7);
                    ctx.fillStyle = '#666666';
                    ctx.fillRect(cx+11, armY+7, 3, 1);
                    ctx.fillStyle = '#ffff88';
                    ctx.fillRect(cx+11, armY+13, 3, 2);
                }

                const hg = ctx.createRadialGradient(cx, 9, 1, cx, 9, 9);
                hg.addColorStop(0, '#f0c8a0');
                hg.addColorStop(1, '#d8a878');
                ctx.fillStyle = hg;
                ctx.beginPath(); ctx.arc(cx, 9, 9, 0, Math.PI*2); ctx.fill();

                ctx.fillStyle = '#1a2244';
                ctx.fillRect(cx-10, 1, 20, 7);
                ctx.fillStyle = '#222a55';
                ctx.fillRect(cx-12, 7, 24, 3);
                ctx.fillStyle = 'rgba(0,0,0,0.15)';
                ctx.fillRect(cx-10, 10, 20, 1);
                ctx.fillStyle = 'rgba(255,255,255,0.06)';
                ctx.fillRect(cx-9, 2, 18, 1);
                if (dir === 'down') {
                    ctx.fillStyle = '#ccaa44';
                    ctx.beginPath(); ctx.arc(cx, 4, 2, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = '#ccaa44';
                    ctx.beginPath(); ctx.arc(cx, 4, 0.8, 0, Math.PI*2); ctx.fill();
                }

                if (dir !== 'up') {
                    const eyeOff = dir === 'left' ? -3 : dir === 'right' ? 3 : 0;
                    ctx.fillStyle = '#2a1a10';
                    ctx.fillRect(cx-6+eyeOff, 8, 5, 1);
                    ctx.fillRect(cx+1+eyeOff, 8, 5, 1);
                    if (dir === 'down') {
                        ctx.save();
                        ctx.translate(cx-6+eyeOff, 8);
                        ctx.rotate(-0.15);
                        ctx.fillRect(0, 0, 5, 1);
                        ctx.restore();
                        ctx.save();
                        ctx.translate(cx+6+eyeOff, 8);
                        ctx.rotate(0.15);
                        ctx.fillRect(-5, 0, 5, 1);
                        ctx.restore();
                    }
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(cx-6+eyeOff, 9, 4, 3);
                    ctx.fillRect(cx+2+eyeOff, 9, 4, 3);
                    ctx.fillStyle = '#1a1a2a';
                    const pupOff = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
                    ctx.fillRect(cx-5+eyeOff+pupOff, 9, 2, 3);
                    ctx.fillRect(cx+3+eyeOff+pupOff, 9, 2, 3);
                    ctx.fillStyle = '#996655';
                    ctx.fillRect(cx-2+Math.floor(eyeOff/2), 14, 5, 1);
                }

                if (dir === 'left' || dir === 'right') {
                    const earX = dir === 'left' ? cx+8 : cx-9;
                    ctx.fillStyle = '#d8a878';
                    ctx.fillRect(earX, 10, 2, 4);
                }

                addOutline(ctx, T, T);
            });
        }
    });

    tex(scene, 'flashlight', 128, 128, (ctx) => {
        ctx.clearRect(0, 0, 128, 128);
        const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        g.addColorStop(0, 'rgba(255,255,180,0.15)');
        g.addColorStop(0.5, 'rgba(255,255,150,0.06)');
        g.addColorStop(1, 'rgba(255,255,100,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 128, 128);
    });

    tex(scene, 'joy_base', 120, 120, (ctx) => {
        ctx.clearRect(0, 0, 120, 120);
        ctx.beginPath();
        ctx.arc(60, 60, 56, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(60, 60, 55, 0, Math.PI*2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath(); ctx.moveTo(60,15); ctx.lineTo(54,25); ctx.lineTo(66,25); ctx.fill();
        ctx.beginPath(); ctx.moveTo(60,105); ctx.lineTo(54,95); ctx.lineTo(66,95); ctx.fill();
        ctx.beginPath(); ctx.moveTo(15,60); ctx.lineTo(25,54); ctx.lineTo(25,66); ctx.fill();
        ctx.beginPath(); ctx.moveTo(105,60); ctx.lineTo(95,54); ctx.lineTo(95,66); ctx.fill();
    });

    tex(scene, 'joy_thumb', 60, 60, (ctx) => {
        ctx.clearRect(0, 0, 60, 60);
        ctx.beginPath();
        ctx.arc(30, 30, 26, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fill();
        const g = ctx.createRadialGradient(30, 28, 3, 30, 30, 24);
        g.addColorStop(0, 'rgba(255,255,255,0.5)');
        g.addColorStop(1, 'rgba(255,255,255,0.2)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(30, 30, 24, 0, Math.PI*2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(30, 30, 23, 0, Math.PI*2);
        ctx.stroke();
    });

    tex(scene, 'action_btn', 80, 80, (ctx) => {
        ctx.clearRect(0, 0, 80, 80);
        ctx.beginPath();
        ctx.arc(40, 40, 36, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fill();
        const g = ctx.createRadialGradient(40, 38, 5, 40, 40, 32);
        g.addColorStop(0, '#ff8833');
        g.addColorStop(1, '#cc5500');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(40, 40, 32, 0, Math.PI*2);
        ctx.fill();
        ctx.strokeStyle = '#ffaa55';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(40, 40, 30, 0, Math.PI*2);
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('A', 40, 41);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath();
        ctx.arc(40, 34, 20, 0, Math.PI, true);
        ctx.fill();
    });

    tex(scene, 'particle', 8, 8, (ctx) => {
        const g = ctx.createRadialGradient(4, 4, 0, 4, 4, 4);
        g.addColorStop(0, 'rgba(255,255,200,0.8)');
        g.addColorStop(1, 'rgba(255,200,100,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 8, 8);
    });

    tex(scene, 'table', T, T, (ctx) => {
        ctx.fillStyle = '#4e4e5c';
        ctx.fillRect(0, 0, T, T);
        const tg = ctx.createLinearGradient(4, 5, 44, 5);
        tg.addColorStop(0, '#6a4a2a');
        tg.addColorStop(0.5, '#7d5c3a');
        tg.addColorStop(1, '#5a3a1a');
        ctx.fillStyle = tg;
        ctx.fillRect(4, 5, 40, 28);
        ctx.strokeStyle = '#4a3018';
        ctx.lineWidth = 1;
        ctx.strokeRect(4, 5, 40, 28);
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 0.5;
        for (let y = 9; y < 32; y += 4) {
            ctx.beginPath(); ctx.moveTo(5, y); ctx.lineTo(43, y + 1); ctx.stroke();
        }
        ctx.fillStyle = '#5a3a18';
        ctx.fillRect(7, 33, 4, 12);
        ctx.fillRect(37, 33, 4, 12);
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fillRect(5, 5, 38, 2);
    });

    tex(scene, 'locker', T, T, (ctx) => {
        ctx.fillStyle = '#4e4e5c';
        ctx.fillRect(0, 0, T, T);
        const lg = ctx.createLinearGradient(5, 3, 43, 3);
        lg.addColorStop(0, '#556677');
        lg.addColorStop(0.4, '#6a7a8a');
        lg.addColorStop(1, '#4a5a6a');
        ctx.fillStyle = lg;
        ctx.fillRect(5, 3, 38, 42);
        ctx.strokeStyle = '#3a4a5a';
        ctx.lineWidth = 1;
        ctx.strokeRect(5, 3, 38, 42);
        ctx.strokeStyle = '#3a4a5a';
        ctx.beginPath(); ctx.moveTo(24, 4); ctx.lineTo(24, 44); ctx.stroke();
        for (let x = 10; x < 22; x += 4) {
            ctx.fillStyle = '#2a3a4a';
            ctx.fillRect(x, 6, 3, 7);
        }
        for (let x = 28; x < 40; x += 4) {
            ctx.fillStyle = '#2a3a4a';
            ctx.fillRect(x, 6, 3, 7);
        }
        ctx.fillStyle = '#99aabb';
        ctx.fillRect(20, 24, 3, 6);
        ctx.fillRect(25, 24, 3, 6);
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fillRect(6, 4, 17, 1);
        ctx.fillRect(25, 4, 17, 1);
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.fillRect(6, 43, 17, 1);
        ctx.fillRect(25, 43, 17, 1);
    });

    tex(scene, 'locker_open', T, T, (ctx) => {
        ctx.fillStyle = '#4e4e5c';
        ctx.fillRect(0, 0, T, T);
        const lg = ctx.createLinearGradient(5, 3, 43, 3);
        lg.addColorStop(0, '#556677');
        lg.addColorStop(0.4, '#6a7a8a');
        lg.addColorStop(1, '#4a5a6a');
        ctx.fillStyle = lg;
        ctx.fillRect(5, 3, 38, 42);
        ctx.strokeStyle = '#3a4a5a';
        ctx.strokeRect(5, 3, 38, 42);
        ctx.fillStyle = '#2a3a4a';
        ctx.fillRect(6, 4, 16, 40);
        ctx.fillStyle = '#4a5a6a';
        ctx.fillRect(8, 18, 12, 1);
        ctx.fillRect(8, 30, 12, 1);
        ctx.strokeStyle = '#3a4a5a';
        ctx.beginPath(); ctx.moveTo(24, 4); ctx.lineTo(24, 44); ctx.stroke();
    });

    tex(scene, 'crate', T, T, (ctx) => {
        ctx.fillStyle = '#4e4e5c';
        ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = '#6a5030';
        ctx.fillRect(4, 6, 40, 38);
        ctx.strokeStyle = '#4a3018';
        ctx.lineWidth = 1;
        ctx.strokeRect(4, 6, 40, 38);
        ctx.strokeStyle = '#4a3018';
        ctx.lineWidth = 0.5;
        for (let x = 14; x < 42; x += 10) {
            ctx.beginPath(); ctx.moveTo(x, 7); ctx.lineTo(x, 43); ctx.stroke();
        }
        ctx.strokeStyle = '#5a4020';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(5, 7); ctx.lineTo(43, 43); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(43, 7); ctx.lineTo(5, 43); ctx.stroke();
        ctx.fillStyle = '#888877';
        [[7,9],[41,9],[7,41],[41,41]].forEach(([x,y]) => {
            ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI*2); ctx.fill();
        });
    });

    tex(scene, 'fence', T, T, (ctx) => {
        ctx.fillStyle = '#4e4e5c';
        ctx.fillRect(0, 0, T, T);
        ctx.strokeStyle = '#7a8a9a';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < T; x += 10) {
            for (let y = 0; y < T; y += 10) {
                const off = (Math.floor(y / 10) % 2) * 5;
                ctx.beginPath();
                ctx.moveTo(x + off, y);
                ctx.lineTo(x + off + 5, y + 5);
                ctx.lineTo(x + off, y + 10);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x + off + 5, y + 5);
                ctx.lineTo(x + off + 10, y);
                ctx.stroke();
            }
        }
        ctx.strokeStyle = '#5a6a7a';
        ctx.lineWidth = 4;
        ctx.strokeRect(1, 1, 46, 46);
        ctx.fillStyle = '#cc8800';
        ctx.fillRect(17, 17, 14, 14);
        ctx.fillStyle = '#000';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('!', 24, 29);
    });

    tex(scene, 'fence_cut', T, T, (ctx) => {
        ctx.fillStyle = '#4e4e5c';
        ctx.fillRect(0, 0, T, T);
        ctx.strokeStyle = '#7a8a9a';
        ctx.lineWidth = 1;
        for (let x = 0; x < 10; x += 10) {
            for (let y = 0; y < T; y += 10) {
                ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x+5, y+5); ctx.stroke();
            }
        }
        for (let x = 36; x < T; x += 10) {
            for (let y = 0; y < T; y += 10) {
                ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x+5, y+5); ctx.stroke();
            }
        }
        ctx.strokeStyle = '#aabbcc';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(12, 0);
        for (let y = 0; y < T; y += 4) { ctx.lineTo(12 + (Math.random()*5-2.5), y); }
        ctx.stroke();
        ctx.beginPath(); ctx.moveTo(36, 0);
        for (let y = 0; y < T; y += 4) { ctx.lineTo(36 + (Math.random()*5-2.5), y); }
        ctx.stroke();
    });

    tex(scene, 'screwdriver', 30, 30, (ctx) => {
        ctx.clearRect(0, 0, 30, 30);
        ctx.fillStyle = '#cc4422';
        ctx.fillRect(3, 9, 12, 12);
        ctx.fillStyle = '#aa3318';
        ctx.fillRect(3, 9, 12, 3);
        ctx.fillStyle = '#dd5533';
        ctx.fillRect(5, 12, 2, 7);
        const sg = ctx.createLinearGradient(15, 13, 27, 13);
        sg.addColorStop(0, '#999aaa');
        sg.addColorStop(0.5, '#cccdd8');
        sg.addColorStop(1, '#888899');
        ctx.fillStyle = sg;
        ctx.fillRect(15, 12, 12, 6);
        ctx.fillStyle = '#aabbcc';
        ctx.fillRect(27, 13, 3, 4);
    });

    tex(scene, 'wire_cutters', 30, 30, (ctx) => {
        ctx.clearRect(0, 0, 30, 30);
        ctx.fillStyle = '#cc4422';
        ctx.fillRect(1, 3, 6, 10);
        ctx.fillRect(1, 17, 6, 10);
        ctx.fillStyle = '#dd5533';
        ctx.fillRect(2, 5, 2, 6);
        ctx.fillRect(2, 19, 2, 6);
        ctx.fillStyle = '#888899';
        ctx.beginPath(); ctx.arc(10, 15, 5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#666677';
        ctx.beginPath(); ctx.arc(10, 15, 2.5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#aabbcc';
        ctx.beginPath();
        ctx.moveTo(14, 10); ctx.lineTo(27, 5); ctx.lineTo(27, 8); ctx.lineTo(14, 13);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(14, 17); ctx.lineTo(27, 22); ctx.lineTo(27, 25); ctx.lineTo(14, 20);
        ctx.fill();
    });

    tex(scene, 'keycard', 30, 24, (ctx) => {
        ctx.clearRect(0, 0, 30, 24);
        ctx.fillStyle = '#2255aa';
        ctx.fillRect(1, 3, 28, 18);
        ctx.strokeStyle = '#1144aa';
        ctx.lineWidth = 1;
        ctx.strokeRect(1, 3, 28, 18);
        ctx.fillStyle = '#111122';
        ctx.fillRect(3, 6, 24, 4);
        ctx.fillStyle = '#ccaa44';
        ctx.fillRect(5, 13, 8, 5);
        ctx.strokeStyle = '#aa8822';
        ctx.strokeRect(5, 13, 8, 5);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(16, 15, 10, 1);
        ctx.fillRect(16, 17, 8, 1);
    });

    tex(scene, 'security_panel', T, T, (ctx) => {
        ctx.fillStyle = '#2d2d3d';
        ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = '#222233';
        ctx.fillRect(6, 6, 36, 36);
        ctx.strokeStyle = '#445566';
        ctx.lineWidth = 1;
        ctx.strokeRect(6, 6, 36, 36);
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.fillRect(7, 7, 34, 1);
        ctx.fillStyle = '#001a33';
        ctx.fillRect(10, 10, 28, 16);
        ctx.strokeStyle = '#003355';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(10, 10, 28, 16);
        ctx.fillStyle = '#002244';
        for (let sy = 11; sy < 25; sy += 2) {
            ctx.fillRect(11, sy, 26, 1);
        }
        ctx.fillStyle = '#00cc66';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('LOCKED', 24, 21);
        ctx.fillStyle = '#006633';
        ctx.fillRect(12, 23, 8, 1);
        for (let r = 0; r < 2; r++) {
            for (let c = 0; c < 3; c++) {
                ctx.fillStyle = '#2a3344';
                ctx.beginPath();
                ctx.arc(14 + c * 10, 33 + r * 6, 3, 0, Math.PI*2);
                ctx.fill();
                ctx.fillStyle = '#445566';
                ctx.beginPath();
                ctx.arc(14 + c * 10, 33 + r * 6, 2.5, 0, Math.PI*2);
                ctx.fill();
                ctx.fillStyle = 'rgba(255,255,255,0.08)';
                ctx.beginPath();
                ctx.arc(13.5 + c * 10, 32.5 + r * 6, 1, 0, Math.PI*2);
                ctx.fill();
            }
        }
        ctx.fillStyle = '#ff2222';
        ctx.beginPath(); ctx.arc(38, 10, 2.5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#ff6666';
        ctx.beginPath(); ctx.arc(37.5, 9.5, 1, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = 'rgba(255,0,0,0.08)';
        ctx.beginPath(); ctx.arc(38, 10, 5, 0, Math.PI*2); ctx.fill();
    });

    tex(scene, 'floor_dirty', T, T, (ctx) => {
        ctx.fillStyle = '#3e3e4a';
        ctx.fillRect(0, 0, T, T);
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 0.5, T-1, T-1);
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * T;
            const y = Math.random() * T;
            ctx.fillStyle = `rgba(${30+Math.random()*15},${30+Math.random()*15},${35+Math.random()*15},0.5)`;
            ctx.fillRect(x, y, 1+Math.random()*4, 1+Math.random()*4);
        }
        if (Math.random() > 0.35) {
            ctx.fillStyle = 'rgba(30,25,20,0.25)';
            ctx.beginPath();
            ctx.arc(T/2+Math.random()*12-6, T/2+Math.random()*12-6, 6+Math.random()*7, 0, Math.PI*2);
            ctx.fill();
        }
    });

    // --- NEW TILE TEXTURES ---

    // Safe (dark metal box with dials)
    tex(scene, 'safe', T, T, (ctx) => {
        ctx.fillStyle = '#2a2a30'; ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = '#3a3a44'; ctx.fillRect(4, 4, T-8, T-8);
        ctx.strokeStyle = '#555566'; ctx.lineWidth = 2; ctx.strokeRect(4, 4, T-8, T-8);
        // 3 digit windows
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = '#111118'; ctx.fillRect(10 + i*12, 10, 10, 14);
            ctx.fillStyle = '#44ff44'; ctx.font = 'bold 10px monospace';
            ctx.fillText('0', 12 + i*12, 21);
        }
        // dial
        ctx.fillStyle = '#888899'; ctx.beginPath(); ctx.arc(T/2, 34, 8, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#555566'; ctx.beginPath(); ctx.arc(T/2, 34, 4, 0, Math.PI*2); ctx.fill();
        // handle
        ctx.fillStyle = '#aaaaaa'; ctx.fillRect(T-12, T/2-3, 8, 6);
    });

    // Binary panel (switches + LED display)
    tex(scene, 'binary_panel', T, T, (ctx) => {
        ctx.fillStyle = '#1a1a28'; ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = '#222233'; ctx.fillRect(3, 3, T-6, T-6);
        ctx.strokeStyle = '#334455'; ctx.lineWidth = 1; ctx.strokeRect(3, 3, T-6, T-6);
        // LED display
        ctx.fillStyle = '#001100'; ctx.fillRect(8, 6, T-16, 12);
        ctx.fillStyle = '#00cc44'; ctx.font = 'bold 9px monospace'; ctx.fillText('0000', 12, 15);
        // 4 switches
        for (let i = 0; i < 4; i++) {
            ctx.fillStyle = '#444455'; ctx.fillRect(8 + i*10, 22, 7, 14);
            ctx.fillStyle = '#ff4444'; ctx.fillRect(9 + i*10, 28, 5, 7);
        }
        // labels
        ctx.fillStyle = '#666688'; ctx.font = '6px monospace';
        ['8','4','2','1'].forEach((v, i) => ctx.fillText(v, 10 + i*10, 44));
    });

    // Cipher station (table with paper)
    tex(scene, 'cipher_station', T, T, (ctx) => {
        ctx.fillStyle = '#3d2b1a'; ctx.fillRect(0, 0, T, T); // table
        ctx.fillStyle = '#4d3b2a'; ctx.fillRect(4, 4, T-8, T-8);
        // paper
        ctx.fillStyle = '#e8e0c8'; ctx.fillRect(10, 8, T-20, T-20);
        // "coded" scribbles
        ctx.strokeStyle = '#334455'; ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(14, 14+i*6); ctx.lineTo(34, 14+i*6); ctx.stroke(); }
        // decoder wheel
        ctx.strokeStyle = '#cc4444'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(T/2, T/2+4, 8, 0, Math.PI*2); ctx.stroke();
        ctx.beginPath(); ctx.arc(T/2, T/2+4, 5, 0, Math.PI*2); ctx.stroke();
    });

    // Computer terminal
    tex(scene, 'computer', T, T, (ctx) => {
        ctx.fillStyle = '#2a2220'; ctx.fillRect(0, 0, T, T); // desk
        ctx.fillStyle = '#3a3230'; ctx.fillRect(2, T-12, T-4, 12);
        // monitor
        ctx.fillStyle = '#1a1a22'; ctx.fillRect(8, 4, T-16, T-20);
        ctx.strokeStyle = '#444455'; ctx.lineWidth = 1.5; ctx.strokeRect(8, 4, T-16, T-20);
        // screen content (green scanlines)
        ctx.fillStyle = '#002200'; ctx.fillRect(10, 6, T-20, T-24);
        for (let i = 0; i < 5; i++) {
            ctx.fillStyle = `rgba(0,${180+i*10},0,0.4)`;
            ctx.fillRect(12, 8+i*5, T-24, 2);
        }
        // blinking cursor
        ctx.fillStyle = '#00ff44'; ctx.fillRect(12, T-18, 4, 6);
        // keyboard
        ctx.fillStyle = '#333344'; ctx.fillRect(12, T-8, T-24, 5);
    });

    // Guard schedule board
    tex(scene, 'schedule_board', T, T, (ctx) => {
        ctx.fillStyle = '#555544'; ctx.fillRect(0, 0, T, T); // wall bg
        // cork board
        ctx.fillStyle = '#aa8855'; ctx.fillRect(6, 6, T-12, T-12);
        ctx.strokeStyle = '#886633'; ctx.lineWidth = 2; ctx.strokeRect(6, 6, T-12, T-12);
        // pinned papers
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = '#eeeedd'; ctx.fillRect(10+i*10, 12, 8, 10);
            ctx.fillStyle = '#cc2222'; ctx.beginPath(); ctx.arc(14+i*10, 12, 2, 0, Math.PI*2); ctx.fill();
        }
        // bottom paper
        ctx.fillStyle = '#ddeeff'; ctx.fillRect(12, 28, 24, 12);
        ctx.fillStyle = '#cc2222'; ctx.beginPath(); ctx.arc(24, 28, 2, 0, Math.PI*2); ctx.fill();
    });

    // Wire puzzle panel
    tex(scene, 'wire_puzzle', T, T, (ctx) => {
        ctx.fillStyle = '#1a1a28'; ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = '#222238'; ctx.fillRect(3, 3, T-6, T-6);
        ctx.strokeStyle = '#334455'; ctx.lineWidth = 1; ctx.strokeRect(3, 3, T-6, T-6);
        // 3x3 grid
        const cs = 12;
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
            ctx.fillStyle = '#2a2a3a'; ctx.fillRect(6+c*(cs+2), 6+r*(cs+2), cs, cs);
            // random wire segments
            ctx.strokeStyle = '#ffaa22'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(6+c*(cs+2)+cs/2, 6+r*(cs+2)); ctx.lineTo(6+c*(cs+2)+cs/2, 6+r*(cs+2)+cs); ctx.stroke();
        }
        // power indicator
        ctx.fillStyle = '#ff2222'; ctx.beginPath(); ctx.arc(T-8, T-8, 3, 0, Math.PI*2); ctx.fill();
    });

    // Pattern door
    tex(scene, 'pattern_door', T, T, (ctx) => {
        ctx.fillStyle = '#443322'; ctx.fillRect(0, 0, T, T); // wood
        ctx.strokeStyle = '#332211'; ctx.lineWidth = 2; ctx.strokeRect(2, 2, T-4, T-4);
        // display panel at top
        ctx.fillStyle = '#111122'; ctx.fillRect(8, 6, T-16, 14);
        ctx.fillStyle = '#ff8844'; ctx.font = 'bold 8px monospace'; ctx.fillText('? ? ?', 14, 16);
        // lock
        ctx.fillStyle = '#888844'; ctx.fillRect(T/2-4, T/2+2, 8, 10);
        ctx.fillStyle = '#aaaa66'; ctx.beginPath(); ctx.arc(T/2, T/2, 5, Math.PI, 0); ctx.stroke();
    });

    // Tally wall
    tex(scene, 'tally_wall', T, T, (ctx) => {
        // wall base
        ctx.fillStyle = '#555550'; ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = '#4a4a45'; ctx.fillRect(2, 2, T-4, T/2-2);
        ctx.fillStyle = '#504f4a'; ctx.fillRect(2, T/2, T-4, T/2-2);
        ctx.strokeStyle = '#3a3a35'; ctx.lineWidth = 1;
        ctx.strokeRect(2, 2, T-4, T/2-2); ctx.strokeRect(2, T/2, T-4, T/2-2);
        // tally scratches
        ctx.strokeStyle = '#ccccbb'; ctx.lineWidth = 1;
        for (let g = 0; g < 3; g++) {
            const bx = 6 + g * 14, by = 10;
            for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.moveTo(bx+j*3, by); ctx.lineTo(bx+j*3, by+10); ctx.stroke(); }
            ctx.beginPath(); ctx.moveTo(bx-1, by+5); ctx.lineTo(bx+10, by+5); ctx.stroke(); // diagonal
        }
        for (let g = 0; g < 3; g++) {
            const bx = 6 + g * 14, by = 28;
            for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.moveTo(bx+j*3, by); ctx.lineTo(bx+j*3, by+10); ctx.stroke(); }
            ctx.beginPath(); ctx.moveTo(bx-1, by+5); ctx.lineTo(bx+10, by+5); ctx.stroke();
        }
    });

    // Cheese (small pickup)
    tex(scene, 'cheese', 24, 24, (ctx) => {
        ctx.fillStyle = '#ffcc22';
        ctx.beginPath(); ctx.moveTo(2, 20); ctx.lineTo(22, 20); ctx.lineTo(12, 4); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#cc9900'; ctx.lineWidth = 1; ctx.stroke();
        // holes
        ctx.fillStyle = '#ee9900';
        ctx.beginPath(); ctx.arc(10, 14, 2, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(15, 17, 1.5, 0, Math.PI*2); ctx.fill();
    });

    // Morse radio
    tex(scene, 'morse_radio', T, T, (ctx) => {
        ctx.fillStyle = '#2a2520'; ctx.fillRect(0, 0, T, T); // shelf bg
        // radio body
        ctx.fillStyle = '#3a3530'; ctx.fillRect(8, 12, T-16, T-20);
        ctx.strokeStyle = '#555544'; ctx.lineWidth = 1; ctx.strokeRect(8, 12, T-16, T-20);
        // speaker grille
        for (let i = 0; i < 4; i++) { ctx.fillStyle = '#222218'; ctx.fillRect(12, 16+i*4, 14, 2); }
        // dials
        ctx.fillStyle = '#888877'; ctx.beginPath(); ctx.arc(34, 22, 3, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#888877'; ctx.beginPath(); ctx.arc(34, 32, 3, 0, Math.PI*2); ctx.fill();
        // antenna
        ctx.strokeStyle = '#aaaaaa'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(T-10, 12); ctx.lineTo(T-6, 2); ctx.stroke();
        // LED
        ctx.fillStyle = '#00ff44'; ctx.beginPath(); ctx.arc(12, 40, 2, 0, Math.PI*2); ctx.fill();
    });

    // Pressure plate (floor with X marking)
    tex(scene, 'pressure_plate', T, T, (ctx) => {
        ctx.fillStyle = '#3a3530'; ctx.fillRect(0, 0, T, T);
        for (let i = 0; i < 8; i++) {
            ctx.fillStyle = `rgba(${30+Math.random()*10},${28+Math.random()*10},${25+Math.random()*10},0.4)`;
            ctx.fillRect(Math.random()*T, Math.random()*T, 2+Math.random()*3, 2+Math.random()*3);
        }
        // depressed square
        ctx.strokeStyle = '#ffaa33'; ctx.lineWidth = 2;
        ctx.strokeRect(8, 8, T-16, T-16);
        // X marking
        ctx.strokeStyle = '#ff6622'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(14, 14); ctx.lineTo(T-14, T-14); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(T-14, 14); ctx.lineTo(14, T-14); ctx.stroke();
    });

    // Pressure plate active (crate on it)
    tex(scene, 'pressure_plate_active', T, T, (ctx) => {
        ctx.fillStyle = '#3a3530'; ctx.fillRect(0, 0, T, T);
        ctx.strokeStyle = '#44ff44'; ctx.lineWidth = 2; ctx.strokeRect(8, 8, T-16, T-16);
        ctx.fillStyle = 'rgba(0,255,0,0.08)'; ctx.fillRect(8, 8, T-16, T-16);
    });

    // Pushable crate
    tex(scene, 'pushable_crate', T, T, (ctx) => {
        ctx.fillStyle = '#6b5030'; ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = '#7a5f3a'; ctx.fillRect(3, 3, T-6, T-6);
        ctx.strokeStyle = '#4a3520'; ctx.lineWidth = 2; ctx.strokeRect(3, 3, T-6, T-6);
        // planks
        ctx.strokeStyle = '#5a4028'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(3, T/2); ctx.lineTo(T-3, T/2); ctx.stroke();
        // label
        ctx.fillStyle = '#eeddcc'; ctx.fillRect(8, 14, T-16, 18);
        ctx.fillStyle = '#442200'; ctx.font = 'bold 6px sans-serif';
        ctx.textAlign = 'center'; ctx.fillText('NOT', T/2, 23);
        ctx.fillText('SUSPICIOUS', T/2, 30);
        ctx.textAlign = 'start';
    });

    // Graffiti wall
    tex(scene, 'graffiti_wall', T, T, (ctx) => {
        // wall base
        ctx.fillStyle = '#555550'; ctx.fillRect(0, 0, T, T);
        ctx.fillStyle = '#4a4a45'; ctx.fillRect(2, 2, T-4, T/2-2);
        ctx.fillStyle = '#504f4a'; ctx.fillRect(2, T/2, T-4, T/2-2);
        ctx.strokeStyle = '#3a3a35'; ctx.lineWidth = 1;
        ctx.strokeRect(2, 2, T-4, T/2-2); ctx.strokeRect(2, T/2, T-4, T/2-2);
        // graffiti scribbles
        ctx.strokeStyle = '#ff6644'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(8, 10); ctx.quadraticCurveTo(24, 6, 40, 14); ctx.stroke();
        ctx.strokeStyle = '#44aaff'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(6, 28); ctx.lineTo(20, 24); ctx.lineTo(30, 30); ctx.stroke();
        ctx.fillStyle = '#ffcc22'; ctx.font = '7px sans-serif'; ctx.fillText('!', 36, 36);
    });

    // Rat sprite
    tex(scene, 'rat', 24, 24, (ctx) => {
        // body
        ctx.fillStyle = '#7a6a55';
        ctx.beginPath(); ctx.ellipse(12, 14, 7, 5, 0, 0, Math.PI*2); ctx.fill();
        // head
        ctx.fillStyle = '#8a7a65';
        ctx.beginPath(); ctx.ellipse(19, 12, 4, 3.5, -0.2, 0, Math.PI*2); ctx.fill();
        // ears
        ctx.fillStyle = '#aa9988'; ctx.beginPath(); ctx.arc(20, 9, 2, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(17, 9, 2, 0, Math.PI*2); ctx.fill();
        // eyes
        ctx.fillStyle = '#111111'; ctx.beginPath(); ctx.arc(20, 11, 1, 0, Math.PI*2); ctx.fill();
        // nose
        ctx.fillStyle = '#ff8888'; ctx.beginPath(); ctx.arc(22, 12, 1, 0, Math.PI*2); ctx.fill();
        // tail
        ctx.strokeStyle = '#9a8a75'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(5, 14); ctx.quadraticCurveTo(1, 8, 3, 4); ctx.stroke();
    });

    // Diary page pickup
    tex(scene, 'diary_page', 24, 30, (ctx) => {
        // yellowed paper
        ctx.fillStyle = '#e8dcc0'; ctx.fillRect(2, 2, 20, 26);
        ctx.strokeStyle = '#aa9970'; ctx.lineWidth = 1; ctx.strokeRect(2, 2, 20, 26);
        // text lines
        ctx.strokeStyle = '#8888aa'; ctx.lineWidth = 0.5;
        for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(5, 7+i*4); ctx.lineTo(19, 7+i*4); ctx.stroke(); }
        // corner fold
        ctx.fillStyle = '#d4c8a8';
        ctx.beginPath(); ctx.moveTo(16, 2); ctx.lineTo(22, 2); ctx.lineTo(22, 8); ctx.closePath(); ctx.fill();
    });
}

export { TEX_QUEUE, generateTextures };
