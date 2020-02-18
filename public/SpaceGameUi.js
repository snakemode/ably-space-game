class SpaceGameUi {
  
  getClickableMetadata(clickables) {
    return clickables.map(e => ({
      id: e.id,
      type: e.type || "clickable",
      min: e.min || -1,
      max: e.max || -1,
      hint: e.dataset.hint || null
    }));  
  }
  
  displayDebugHint(response) {
      document.getElementById("text-message-hint").innerText = (response.hint + " " + response.flavor).trim();
  }

  updateUiState(clickedElement) {
    if (clickedElement.hasAttribute("data-selected")) {
      clickedElement.removeAttribute("data-selected")
    } else {
      clickedElement.setAttribute("data-selected", "")
      clickedElement.parentElement.setAttribute("data-selected", clickedElement.id);
    }
  }
}