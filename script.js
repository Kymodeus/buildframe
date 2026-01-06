const leftCard = document.querySelector('.build-card[data-side="left"]');
const rightCard = document.querySelector('.build-card[data-side="right"]');
const comparisonRows = document.querySelectorAll('.comparison-row');

function getValues(card) {
    return [...card.querySelectorAll('.stat-value')].map(input =>
        Number(input.value) || 0
    );
}

function updateComparison() {
    const leftValues = getValues(leftCard);
    const rightValues = getValues(rightCard);

    comparisonRows.forEach((row, index) => {
        const leftSpan = row.querySelector('.left-indicator');
        const rightSpan = row.querySelector('.right-indicator');
        const labelInput = row.querySelector('.stat-label');

        const leftVal = leftValues[index] ?? 0;
        const rightVal = rightValues[index] ?? 0;
        const diff = Math.abs(leftVal - rightVal);

        leftSpan.textContent = "";
        rightSpan.textContent = "";
        leftSpan.className = "left-indicator";
        rightSpan.className = "right-indicator";

        if (!labelInput.value.trim()) return;

        if (leftVal > rightVal) {
            leftSpan.textContent = `← +${diff}`;
            leftSpan.classList.add("win-left");
        } else if (rightVal > leftVal) {
            rightSpan.textContent = `+${diff} →`;
            rightSpan.classList.add("win-right");
        } else {
            if (leftVal !== 0 || rightVal !== 0) {
                leftSpan.textContent = "＝";
                rightSpan.textContent = "＝";
                leftSpan.classList.add("tie");
                rightSpan.classList.add("tie");
            }
        }
    });
}

document.addEventListener("input", updateComparison);
