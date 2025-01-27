var FeedbackWidget=(()=>{var r=class{constructor({logo:e,projectId:t,supabaseUrl:a,supabaseKey:i}){if(!e||!t||!a||!i)throw new Error("Logo, Project ID, Supabase URL, and Supabase Key are required.");this.logo=e,this.projectId=t,this.supabaseUrl=a,this.supabaseKey=i,this.feedbackType="",this.message="",this.rating=0,this.initSupabase(),this.renderWidget()}initSupabase(){this.supabase=createClient(this.supabaseUrl,this.supabaseKey)}renderWidget(){let e=document.createElement("div");e.id="feedback-widget-container",e.style=`
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
      `,e.innerHTML=`
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
      `,document.body.appendChild(e),e.querySelectorAll("button[data-feedback-type]").forEach(t=>{t.addEventListener("click",a=>{this.feedbackType=a.target.getAttribute("data-feedback-type"),this.highlightFeedbackType(a.target)})}),document.getElementById("feedback-submit").addEventListener("click",()=>this.handleSubmit())}highlightFeedbackType(e){document.querySelectorAll("button[data-feedback-type]").forEach(t=>t.style.background=""),e.style.background="blue",e.style.color="white"}async handleSubmit(){let e=document.getElementById("feedback-message").value,t=parseInt(document.getElementById("feedback-rating").value,10);if(!this.feedbackType||!e||isNaN(t)){alert("Please fill out all fields.");return}try{let{data:a,error:i}=await this.supabase.rpc("add_feedback",{p_project_id:this.projectId,p_message:e,p_rating:t,p_response_type:this.feedbackType});if(i)throw i;alert("Thank you for your feedback!"),this.resetForm()}catch(a){console.error("Error submitting feedback:",a.message),alert("Failed to submit feedback. Please try again later.")}}resetForm(){this.feedbackType="",document.getElementById("feedback-message").value="",document.getElementById("feedback-rating").value="",document.querySelectorAll("button[data-feedback-type]").forEach(e=>e.style.background="")}};window.FeedbackWidget=r;})();
