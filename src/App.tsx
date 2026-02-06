import { useState, useEffect } from "react";
import { supabase } from "./supabase/supabse";

function App() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form state
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        job_name: "",
        company_name: "",
        job_link: "",
        status: "Venter",
        note: "",
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    async function fetchJobs() {
        setLoading(true);
        const { data, error } = await supabase
            .from("job_applications")
            .select("*")
            .order("applied_date", { ascending: false });

        if (error) {
            console.error("Error:", error);
        } else {
            setJobs(data || []);
        }
        setLoading(false);
    }

    async function addJob(e) {
        e.preventDefault();

        const { data, error } = await supabase
            .from("job_applications")
            .insert([formData])
            .select();

        if (!error && data) {
            setJobs([...data, ...jobs]);
            // Reset form
            setFormData({
                job_name: "",
                company_name: "",
                job_link: "",
                status: "Venter",
                note: "",
            });
            setShowForm(false);
        } else {
            console.error("Error adding job:", error);
        }
    }

    async function updateJobStatus(id, newStatus) {
        const { error } = await supabase
            .from("job_applications")
            .update({ status: newStatus })
            .eq("id", id);

        if (!error) {
            fetchJobs();
        }
    }

    async function deleteJob(id) {
        const { error } = await supabase
            .from("job_applications")
            .delete()
            .eq("id", id);

        if (!error) {
            setJobs(jobs.filter((job) => job.id !== id));
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Job Applications</h1>

            <button
                onClick={() => setShowForm(!showForm)}
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    cursor: "pointer",
                }}
            >
                {showForm ? "Cancel" : "Add New Job"}
            </button>

            {showForm && (
                <form
                    onSubmit={addJob}
                    style={{
                        border: "1px solid #ccc",
                        padding: "20px",
                        marginBottom: "20px",
                        borderRadius: "5px",
                    }}
                >
                    <div style={{ marginBottom: "10px" }}>
                        <label>Job Name: *</label>
                        <input
                            type="text"
                            value={formData.job_name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    job_name: e.target.value,
                                })
                            }
                            required
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>Company Name:</label>
                        <input
                            type="text"
                            value={formData.company_name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    company_name: e.target.value,
                                })
                            }
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>Job Link:</label>
                        <input
                            type="url"
                            value={formData.job_link}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    job_link: e.target.value,
                                })
                            }
                            placeholder="https://..."
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>Status:</label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: e.target.value,
                                })
                            }
                            style={{ width: "100%", padding: "8px" }}
                        >
                            <option value="Venter">Venter</option>
                            <option value="Søkte">Søkte</option>
                            <option value="Ringte">Ringte</option>
                            <option value="Svarte">Svarte</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>Note:</label>
                        <textarea
                            value={formData.note}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    note: e.target.value,
                                })
                            }
                            style={{
                                width: "100%",
                                padding: "8px",
                                minHeight: "80px",
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ padding: "10px 20px", cursor: "pointer" }}
                    >
                        Add Job
                    </button>
                </form>
            )}

            <div>
                {jobs.length === 0 ? (
                    <p>No job applications yet. Add one to get started!</p>
                ) : (
                    jobs.map((job) => (
                        <div
                            key={job.id}
                            style={{
                                border: "1px solid #ddd",
                                padding: "15px",
                                marginBottom: "15px",
                                borderRadius: "5px",
                            }}
                        >
                            <h3>{job.job_name}</h3>
                            {job.company_name && (
                                <p>
                                    <strong>Company:</strong> {job.company_name}
                                </p>
                            )}
                            {job.job_link && (
                                <p>
                                    <a
                                        href={job.job_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Job Posting
                                    </a>
                                </p>
                            )}
                            {job.note && (
                                <p>
                                    <strong>Note:</strong> {job.note}
                                </p>
                            )}

                            <div style={{ marginTop: "10px" }}>
                                <label>
                                    <strong>Status:</strong>{" "}
                                </label>
                                <select
                                    value={job.status}
                                    onChange={(e) =>
                                        updateJobStatus(job.id, e.target.value)
                                    }
                                    style={{
                                        marginLeft: "10px",
                                        padding: "5px",
                                    }}
                                >
                                    <option value="Venter">Venter</option>
                                    <option value="Søkte">Søkte</option>
                                    <option value="Ringte">Ringte</option>
                                    <option value="Svarte">Svarte</option>
                                </select>
                            </div>

                            <button
                                onClick={() => deleteJob(job.id)}
                                style={{
                                    marginTop: "10px",
                                    padding: "8px 15px",
                                    backgroundColor: "#ff4444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "3px",
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
