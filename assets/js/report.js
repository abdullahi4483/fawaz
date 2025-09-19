document.addEventListener("DOMContentLoaded", function () {
  // Event listener for the print button
  const printButton = document.getElementById("printReportBtn");
  if (printButton) {
    printButton.addEventListener("click", function () {
      const reportContent = document.getElementById("report-content").innerHTML;
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = reportContent;
      window.print();
      document.body.innerHTML = originalContent;
      // Re-initialize event listeners if needed
      // This is a simple approach; a more robust solution might be needed for complex pages
      location.reload();
    });
  }
});

function displayReport(results) {
  const reportContent = document.getElementById("report-content");
  const noDataMessage = document.getElementById("no-report-data");

  if (!results || results.length === 0 || !results.schedule || results.schedule.length === 0) {
    reportContent.innerHTML = ""; // Clear previous report
    reportContent.appendChild(noDataMessage);
    noDataMessage.style.display = "block";
    return;
  }

  noDataMessage.style.display = "none";

  // Format currency function
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);

  // Report structure
  const reportHTML = `
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="stats-card">
          <div class="stats-value">${formatCurrency(results.projectCost)}</div>
          <div class="stats-label">Target Amount</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stats-card">
          <div class="stats-value">${formatCurrency(results.totalContributions)}</div>
          <div class="stats-label">Total Contributions</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stats-card">
          <div class="stats-value">${formatCurrency(results.totalInterest)}</div>
          <div class="stats-label">Total Interest</div>
        </div>
      </div>
       <div class="col-md-3">
        <div class="stats-card">
          <div class="stats-value">${formatCurrency(results.finalBalance)}</div>
          <div class="stats-label">Final Balance</div>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th>Period</th>
            <th>Date</th>
            <th>Contribution</th>
            <th>Interest Earned</th>
            <th>Ending Balance</th>
          </tr>
        </thead>
        <tbody>
          ${results.schedule
            .map(
              (item) => `
            <tr>
              <td>${item.period}</td>
              <td>${item.date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}</td>
              <td>${formatCurrency(item.contribution)}</td>
              <td>${formatCurrency(item.interest)}</td>
              <td>${formatCurrency(item.balance)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  reportContent.innerHTML = reportHTML;
}
