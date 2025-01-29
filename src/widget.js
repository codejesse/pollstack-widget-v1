(function () {
  // Add the feedback widget to the page
  function createFeedbackWidget(projectId) {
    const button = document.querySelector("[data-feedback-widget]");
    if (!button) return;

    // Modal Template for Feedback Options
    const optionsModalHTML = `
        <div id="feedback-options-modal" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; z-index: 1000; padding: 20px;">
          <h2 style="margin-bottom: 1rem;">Choose feedback option</h2>
          <button class="feedback-option" data-feedback-type="report-issue" style="width: 100%; margin-bottom: 1rem; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px;">⚠️ Report an Issue</button>
          <button class="feedback-option" data-feedback-type="suggest" style="width: 100%; margin-bottom: 1rem; padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px;">💡 Suggest to Us</button>
          <button class="feedback-option" data-feedback-type="other" style="width: 100%; margin-bottom: 1rem; padding: 10px; background: #ffc107; color: white; border: none; border-radius: 4px;">Other</button>
          <button type="button" id="feedback-close" style="margin-top: 10px; padding: 10px; background: #ccc; color: white; border: none; border-radius: 4px;">Cancel</button>
        </div>
        <div id="feedback-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 999;"></div>
      `;

    // Modal Template for Feedback Form
    const formModalHTML = `
        <div id="feedback-form-modal" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; z-index: 1000; padding: 20px;">
          <h2 style="margin-bottom: 1rem;">We Value Your Feedback</h2>
          <form id="feedback-form">
            <label style="display: block; margin-bottom: 0.5rem;">Name</label>
            <input type="text" id="feedback-name" style="width: 100%; margin-bottom: 1rem; padding: 8px;" required />
            <label style="display: block; margin-bottom: 0.5rem;">Email</label>
            <input type="email" id="feedback-email" style="width: 100%; margin-bottom: 1rem; padding: 8px;" required />
            <label style="display: block; margin-bottom: 0.5rem;">Message</label>
            <textarea id="feedback-message" style="width: 100%; margin-bottom: 1rem; padding: 8px;" required></textarea>
            <label style="display: block; margin-bottom: 0.5rem;">Rating</label>
            <select id="feedback-rating" style="width: 100%; margin-bottom: 1rem; padding: 8px;">
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
            <button type="submit" style="background: #007bff; color: white; padding: 10px 15px; border: none; border-radius: 4px;">Submit</button>
            <button type="button" id="feedback-close-form" style="margin-left: 10px; padding: 10px 15px; border: none; background: #ccc; border-radius: 4px;">Cancel</button>
          </form>
        </div>
      `;

    document.body.insertAdjacentHTML("beforeend", optionsModalHTML);
    document.body.insertAdjacentHTML("beforeend", formModalHTML);

    const optionsModal = document.getElementById("feedback-options-modal");
    const formModal = document.getElementById("feedback-form-modal");
    const overlay = document.getElementById("feedback-overlay");
    let selectedFeedbackType = "";

    // Open Feedback Options Modal on Button Click
    button.addEventListener("click", () => {
      optionsModal.style.display = "block";
      overlay.style.display = "block";
    });

    // Close Modal
    const closeModal = () => {
      optionsModal.style.display = "none";
      formModal.style.display = "none";
      overlay.style.display = "none";
    };

    document
      .getElementById("feedback-close")
      .addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    // Handle Feedback Option Selection
    const feedbackOptions = document.querySelectorAll(".feedback-option");
    feedbackOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        selectedFeedbackType = e.target.getAttribute("data-feedback-type");
        optionsModal.style.display = "none";
        formModal.style.display = "block";
      });
    });

    // Handle Form Submission
    const form = document.getElementById("feedback-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("feedback-name").value;
      const email = document.getElementById("feedback-email").value;
      const message = document.getElementById("feedback-message").value;
      const rating = document.getElementById("feedback-rating").value;

      const response = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/rpc/add_feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.SUPABASE_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            p_project_id: projectId,
            p_user_name: name,
            p_user_email: email,
            p_message: message,
            p_rating: parseInt(rating, 10),
            p_response_type: selectedFeedbackType,
          }),
        }
      );

      if (response.ok) {
        alert("Thank you for your feedback!");
        form.reset();
        closeModal();
      } else {
        alert("Something went wrong. Please try again later.");
      }
    });

    // Close Feedback Form Modal
    document
      .getElementById("feedback-close-form")
      .addEventListener("click", closeModal);
  }

  // Initialize the widget
  const script = document.currentScript;
  const projectId = new URL(script.src).searchParams.get("pid");
  const logoUrl = new URL(script.src).searchParams.get("logo") || "";
  const companyName = new URL(script.src).searchParams.get("name") || "";
  const modalType = new URL(script.src).searchParams.get("position") || "";
  const ModalThemeColor = new URL(script.src).searchParams.get("color") || "";
  if (!projectId) {
    console.error("Project ID (pid) is required to use the feedback widget.");
    return;
  }
  createFeedbackWidget(
    projectId,
    logoUrl,
    companyName,
    modalType,
    ModalThemeColor
  );
})();
