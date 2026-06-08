export class HighScores {
    getScores() {
        return JSON.parse(
            localStorage.getItem('scores')
        ) ||  {
            easy: [],
            mid: [],
            expert: []
        };
    }

    saveScore(mode, seconds) {
        const scores = this.getScores();

        scores[mode].push(seconds);
        scores[mode].sort((a, b) => a - b);
        scores[mode] = scores[mode].slice(0, 5);

        localStorage.setItem(
            'scores',
            JSON.stringify(scores)
        );
    }
}