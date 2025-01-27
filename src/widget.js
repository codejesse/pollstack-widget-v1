// Feedback Widget Class
class FeedbackWidget {
    constructor({ logo, projectId, supabaseUrl, supabaseKey }) {
      if (!logo || !projectId || !supabaseUrl || !supabaseKey) {
        throw new Error("Logo, Project ID, Supabase URL, and Supabase Key are required.");
      }
      this.logo = logo;
      this.projectId = projectId;
      this.supabaseUrl = process.env.SUPABASE_URL;
      this.supabaseKey = process.env.SUPABASE_KEY;
      this.feedbackType = "";
      this.message = "";
      this.rating = 0;
  
      this.initSupabase();
      this.renderWidget();
    }
  
    // Initialize Supabase Client
    initSupabase() {
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }
  
    // Render the widget in the DOM
    renderWidget() {
      const container = document.createElement("div");
      container.id = "feedback-widget-container";
      container.style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 300px;
        z-index: 1000;
        font-family: Arial, sans-serif;
      `;
  
      container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <img src="${this.logo}" alt="Logo" style="height: 40px; margin-right: 10px;" />
          <h3 style="margin: 0; font-size: 18px;">Feedback</h3>
        </div>
        <div style="margin-bottom: 10px;">
          <button data-feedback-type="Positive" style="margin-right: 5px;">Positive</button>
          <button data-feedback-type="Neutral" style="margin-right: 5px;">Neutral</button>
          <button data-feedback-type="Negative">Negative</button>
        </div>
        <textarea id="feedback-message" placeholder="Write your feedback..." style="width: 100%; margin-bottom: 10px; height: 60px;"></textarea>
        <div style="margin-bottom: 10px;">
          <label for="feedback-rating" style="display: block; margin-bottom: 5px;">Rating (0-5):</label>
          <input id="feedback-rating" type="number" min="0" max="5" style="width: 50px;" />
        </div>
        <button id="feedback-submit" style="background: green; color: white; border: none; padding: 10px; border-radius: 5px;">Submit</button>
      `;
  
      document.body.appendChild(container);
  
      // Attach event listeners
      container.querySelectorAll('button[data-feedback-type]').forEach((button) => {
        button.addEventListener("click", (e) => {
          this.feedbackType = e.target.getAttribute("data-feedback-type");
          this.highlightFeedbackType(e.target);
        });
      });
  
      document.getElementById("feedback-submit").addEventListener("click", () => this.handleSubmit());
    }
  
    // Highlight the selected feedback type
    highlightFeedbackType(selectedButton) {
      document
        .querySelectorAll("button[data-feedback-type]")
        .forEach((button) => (button.style.background = ""));
      selectedButton.style.background = "blue";
      selectedButton.style.color = "white";
    }
  
    // Handle form submission
    async handleSubmit() {
      const message = document.getElementById("feedback-message").value;
      const rating = parseInt(document.getElementById("feedback-rating").value, 10);
  
      if (!this.feedbackType || !message || isNaN(rating)) {
        alert("Please fill out all fields.");
        return;
      }
  
      try {
        const { data, error } = await this.supabase.rpc("add_feedback", {
          p_project_id: this.projectId,
          p_message: message,
          p_rating: rating,
          p_response_type: this.feedbackType,
        });
  
        if (error) throw error;
  
        alert("Thank you for your feedback!");
        this.resetForm();
      } catch (err) {
        console.error("Error submitting feedback:", err.message);
        alert("Failed to submit feedback. Please try again later.");
      }
    }
  
    // Reset form fields
    resetForm() {
      this.feedbackType = "";
      document.getElementById("feedback-message").value = "";
      document.getElementById("feedback-rating").value = "";
      document
        .querySelectorAll("button[data-feedback-type]")
        .forEach((button) => (button.style.background = ""));
    }
  }
  
  // Export the widget to the global scope
  window.FeedbackWidget = FeedbackWidget;
  