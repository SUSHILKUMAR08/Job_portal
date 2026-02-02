
import { useEffect, useState } from 'react';
import Header from '../Header';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaBuilding } from 'react-icons/fa';
import './index.css';

const Jobs = () => {
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://remotive.com/api/remote-jobs?category=software-dev&limit=20');
      const data = await response.json();
      if (data.jobs && data.jobs.length > 0) {
        console.log("Sample job data:", {
          company_name: data.jobs[0].company_name,
          company_logo: data.jobs[0].company_logo,
          logo_type: typeof data.jobs[0].company_logo
        });
      }
      
      setJobsList(data.jobs.slice(0, 20));
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching jobs", error);
      setIsLoading(false);
    }
  };
  const getLogoUrl = (job) => {
    if (job.company_logo && 
        (job.company_logo.startsWith('http://') || 
         job.company_logo.startsWith('https://'))) {
      return job.company_logo;
    }
    const initials = job.company_name
      ? job.company_name
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .toUpperCase()
          .substring(0, 2)
      : 'CO';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=4f46e5&color=fff&bold=true&size=100`;
  };

  const handleImageError = (e, companyName) => {
    console.log("Image failed to load for:", companyName);
    const initials = companyName
      ? companyName
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .toUpperCase()
          .substring(0, 2)
      : 'CO';
    
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=4f46e5&color=fff&bold=true&size=100`;
    e.target.onerror = null; 
  };

  const filteredJobs = jobsList.filter(job => 
    job.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="jobs-page">
      <Header />
      <div className="jobs-container">
        <div className="search-box">
          <input 
            className="search-input"
            type="search" 
            placeholder="Search by Title..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="search-btn"><FaSearch /></button>
        </div>

        {isLoading ? (
          <p style={{textAlign: 'center'}}>Loading Jobs...</p>
        ) : (
          <div>
            {filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <div className="logo-container">
                    <img 
                      src={getLogoUrl(job)}
                      alt={job.company_name} 
                      className="company-logo" 
                      onError={(e) => handleImageError(e, job.company_name)}
                    />
                  </div>
                  <div className="job-header-info">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="company-name">
                      <FaBuilding className="company-icon" />
                      {job.company_name}
                    </p>
                  </div>
                </div>
                
                <div className="job-details">
                  <span><FaMapMarkerAlt /> {job.candidate_required_location || "Remote"}</span>
                  <span><FaBriefcase /> {job.job_type || "Full-time"}</span>
                </div>

                <div className="job-card-footer">
                  <span className="salary">{job.salary || "Salary Undisclosed"}</span>
                  <a href={job.url} target="_blank" rel="noreferrer" className="apply-link">
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;