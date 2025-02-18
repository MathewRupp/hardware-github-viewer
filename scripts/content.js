console.log("we're running on Gitea");

const observer = new MutationObserver(list => {
    const evt = new CustomEvent('dom-changed', { detail: list });
    document.body.dispatchEvent(evt);
});
observer.observe(document.body, { attributes: true, childList: true, subtree: true });

function insert() {
    const mcadRegex = /\.(FCStd|step|stp)$/;
    const ecadRegex = /\.(kicad_pcb|kicad_sch|kicad_pro)$/;

    const elements = document.querySelectorAll(".file-list a:not(.oshw-viewer)");

    for (let i = 0; i < elements.length; i++) {
        let fileLink = elements[i].href;
        let fileName = elements[i].textContent.trim();
        
        elements[i].classList.add("oshw-viewer");

        const viewerButton = document.createElement("a");
        viewerButton.target = "_blank";
        viewerButton.style.display = "block";

        if (mcadRegex.test(fileName)) {
            viewerButton.href = "https://3dviewer.net/#model=" + encodeURIComponent(fileLink);
            viewerButton.innerText = "View 3D Model";
        } else if (ecadRegex.test(fileName)) {
            viewerButton.href = "https://kicanvas.org/?gitea=" + encodeURIComponent(fileLink);
            viewerButton.innerText = "View PCB";
        } else {
            continue;
        }

        elements[i].insertAdjacentElement("afterend", viewerButton);
    }
}

document.body.addEventListener('dom-changed', () => {
    insert();
});

insert();
