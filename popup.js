document.getElementById('upvote-button').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: upvoteAllComments
        });
    });
});

function upvoteAllComments() {
    const delay = 1000;
    const comments = document.querySelectorAll('shreddit-comment');

    if (comments.length === 0) {
        alert('No comments available to upvote.');
        return;
    }

    let upvoteCount = 0;

    comments.forEach((comment, index) => {
        setTimeout(() => {
            const shadowRoot = comment.shadowRoot;
            const upvoteButton = shadowRoot ? shadowRoot.querySelector('button[data-testid="upvote-button"]') : null; // Select the upvote button


            if (upvoteButton && comment.getAttribute('vote-state') === 'NONE') {
                upvoteButton.click();
                comment.setAttribute('vote-state', 'UPVOTED');
                upvoteCount++;
            }


            if (upvoteCount === comments.length) {
                alert('All comments have been processed!');
            }
        }, index * delay);
    });
}
