export class HighScores {
    getScores() {
        return JSON.parse(
            localStorage.getItem('scores')
        ) || {
            easy: null,
            mid: null,
            expert: null
        };
    }

    saveScore(mode, time) {
        const scores = this.getScores();

        if (scores[mode] === null || time < scores[mode]) {
            scores[mode] = time;
            localStorage.setItem(
                'scores',
                JSON.stringify(scores)
            );
            return true;
        }

        return false;
    }
}