var FeedbackWidget=(()=>{(function(){function c(b){let r=document.querySelector("[data-feedback-widget]");if(!r)return;let m=`
        <div id="feedback-options-modal" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; z-index: 1000; padding: 20px;">
          <h2 style="margin-bottom: 1rem;">What do you want to provide feedback on?</h2>
          <button class="feedback-option" data-feedback-type="report-issue" style="width: 100%; margin-bottom: 1rem; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px;">Report an Issue</button>
          <button class="feedback-option" data-feedback-type="suggest" style="width: 100%; margin-bottom: 1rem; padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px;">Suggest to Us</button>
          <button class="feedback-option" data-feedback-type="other" style="width: 100%; margin-bottom: 1rem; padding: 10px; background: #ffc107; color: white; border: none; border-radius: 4px;">Other</button>
          <button type="button" id="feedback-close" style="margin-top: 10px; padding: 10px; background: #ccc; color: white; border: none; border-radius: 4px;">Cancel</button>
        </div>
        <div id="feedback-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 999;"></div>
      `,u=`
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
      `;document.body.insertAdjacentHTML("beforeend",m),document.body.insertAdjacentHTML("beforeend",u);let t=document.getElementById("feedback-options-modal"),i=document.getElementById("feedback-form-modal"),o=document.getElementById("feedback-overlay"),s="";r.addEventListener("click",()=>{t.style.display="block",o.style.display="block"});let e=()=>{t.style.display="none",i.style.display="none",o.style.display="none"};document.getElementById("feedback-close").addEventListener("click",e),o.addEventListener("click",e),document.querySelectorAll(".feedback-option").forEach(d=>{d.addEventListener("click",a=>{s=a.target.getAttribute("data-feedback-type"),t.style.display="none",i.style.display="block"})});let l=document.getElementById("feedback-form");l.addEventListener("submit",async d=>{d.preventDefault();let a=document.getElementById("feedback-name").value,y=document.getElementById("feedback-email").value,g=document.getElementById("feedback-message").value,f=document.getElementById("feedback-rating").value;(await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/add_feedback`,{method:"POST",headers:{"Content-Type":"application/json",apikey:process.env.SUPABASE_KEY,Authorization:`Bearer ${process.env.SUPABASE_KEY}`},body:JSON.stringify({p_project_id:b,p_user_name:a,p_user_email:y,p_message:g,p_rating:parseInt(f,10),p_response_type:s})})).ok?(alert("Thank you for your feedback!"),l.reset(),e()):alert("Something went wrong. Please try again later.")}),document.getElementById("feedback-close-form").addEventListener("click",e)}let p=document.currentScript,n=new URL(p.src).searchParams.get("pid");if(!n){console.error("Project ID (pid) is required to use the feedback widget.");return}c(n)})();})();
