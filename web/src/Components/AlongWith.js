import React from 'react'

export default function AlongWith() {
    return (
        <div className='alongWith-container'>
            <div className="alongWith-heading">
                <h2>Along with subscription, you also receive...</h2>
            </div>
            <div className="alongWith-content">
                <div className="alongWith-content-item">
                    <h2 className="alongWith-Heading">Hassle-free 60-day money back guarantee</h2>
                    <p className="alongWith-Description">If you are not 100% satisfied with Job Jarvis within the next 60 days, we will provide you a full refund of your subscription payments; no questions, no hassle.</p>
                </div>
                <div className="alongWith-content-item">
                    <h2 className="alongWith-Heading">Dedicated Support</h2>
                    <p className="alongWith-Description mb-2">You are not alone on your Upwork journey because we are here to help you!</p>
                    <ul className="alongWith-List">
                        <li>Schedule 1-on-1 Support Session</li>
                        <li>Email</li>
                        <li>Chat</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
