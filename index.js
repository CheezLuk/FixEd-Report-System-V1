 const ADMIN_PASS = "@#Lets.Fix.Schools";
        let reports = [];

        // Load reports from localStorage
        function loadReports() {
            const stored = localStorage.getItem('schoolReportsGlobal');
            if (stored) {
                try {
                    reports = JSON.parse(stored);
                } catch (e) {
                    reports = [];
                }
            }
        }

        // Save reports to localStorage
        function saveReports() {
            localStorage.setItem('schoolReportsGlobal', JSON.stringify(reports));
        }

        // Navigation functions
        function showMainMenu() {
            document.getElementById('mainMenu').style.display = 'block';
            document.getElementById('reportForm').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'none';
            document.getElementById('reportsDisplay').style.display = 'none';
        }

        function showReportForm() {
            document.getElementById('mainMenu').style.display = 'none';
            document.getElementById('reportForm').style.display = 'block';
            document.getElementById('adminPanel').style.display = 'none';
        }

        function showAdminPanel() {
            document.getElementById('mainMenu').style.display = 'none';
            document.getElementById('reportForm').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'block';
            document.getElementById('adminPassword').value = '';
            document.getElementById('reportsDisplay').style.display = 'none';
        }

        function exitApp() {
            if (confirm('Are you sure you want to exit FixEd?')) {
                window.close();
                setTimeout(() => {
                    alert('Please close this tab to exit the application.');
                }, 100);
            }
        }

        // Report submission
        function submitReport(event) {
            event.preventDefault();
            
            const report = {
                Name: document.getElementById('name').value || 'anonymous',
                Grade: document.getElementById('grade').value,
                Location: document.getElementById('location').value,
                'Issue Type': document.getElementById('issueType').value,
                Description: document.getElementById('description').value,
                'People Involved': document.getElementById('peopleInvolved').value,
                When: document.getElementById('when').value,
                Severity: document.getElementById('severity').value,
                Timestamp: new Date().toLocaleString(),
                id: Date.now()
            };

            reports.push(report);
            saveReports();

            alert('Your report has been saved. Your voice matters!');
            
            // Clear form
            document.getElementById('reportFormData').reset();
            showMainMenu();
        }

        // Admin view reports
        function viewReports() {
            const password = document.getElementById('adminPassword').value;
            
            if (password !== ADMIN_PASS) {
                alert('Incorrect password!');
                return;
            }

            displayReports();
        }

        function displayReports() {
            const reportsDisplay = document.getElementById('reportsDisplay');
            
            if (reports.length === 0) {
                reportsDisplay.innerHTML = '<h3>No Reports Found</h3><p>All reports have been resolved!</p>';
                reportsDisplay.style.display = 'block';
                return;
            }

            let html = '<h3>All Reports (' + reports.length + ')</h3>';
            
            for (let i = 0; i < reports.length; i++) {
                const report = reports[i];
                html += '<div class="report-item">';
                html += '<h4>Report #' + (i + 1) + ' - ' + (report.Severity || 'Unknown') + '</h4>';
                
                // Display report fields
                if (report.Name) html += '<div class="report-field"><strong>Name:</strong> ' + report.Name + '</div>';
                if (report.Grade) html += '<div class="report-field"><strong>Grade:</strong> ' + report.Grade + '</div>';
                if (report.Location) html += '<div class="report-field"><strong>Location:</strong> ' + report.Location + '</div>';
                if (report['Issue Type']) html += '<div class="report-field"><strong>Issue Type:</strong> ' + report['Issue Type'] + '</div>';
                if (report.Description) html += '<div class="report-field"><strong>Description:</strong> ' + report.Description + '</div>';
                if (report['People Involved']) html += '<div class="report-field"><strong>People Involved:</strong> ' + report['People Involved'] + '</div>';
                if (report.When) html += '<div class="report-field"><strong>When:</strong> ' + report.When + '</div>';
                if (report.Timestamp) html += '<div class="report-field"><strong>Submitted:</strong> ' + report.Timestamp + '</div>';
                
                html += '<div class="report-actions">';
                html += '<button class="delete-btn" onclick="deleteReport(' + i + ')">Issue Resolved - Delete Report</button>';
                html += '</div>';
                html += '</div>';
            }
            
            reportsDisplay.innerHTML = html;
            reportsDisplay.style.display = 'block';
        }

        // Delete report function
        function deleteReport(index) {
            if (confirm('Are you sure you want to delete this report? This cannot be undone.')) {
                reports.splice(index, 1);
                saveReports();
                displayReports(); // Refresh the display immediately
                
                // Show notification
                const notification = document.createElement('div');
                notification.textContent = 'Report deleted successfully!';
                notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 10px 15px; border-radius: 5px; z-index: 1000;';
                document.body.appendChild(notification);
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 2000);
            }
        }

        // Initialize
        function init() {
            loadReports();
        }

        window.onload = init;
