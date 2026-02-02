import React from "react";
import MainHeader from "../../components/MainHome/MainHeader";
import Button from "../../components/ui/button/Button";

const TermsConditions = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <MainHeader />

            <main className="mx-auto max-w-5xl px-6 py-12 md:py-20">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold md:text-5xl text-gray-900">
                        Terms & Conditions – NZL App
                    </h1>
                    <p className="mt-4 text-gray-500">Last updated: January 2026</p>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                        By accessing or using the NZL mobile application (“App”), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the App.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">

                    <div className="space-y-8">
                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">1. About NZL</h2>
                            <p className="leading-relaxed text-gray-600">
                                NZL is a deals-based shopping platform that offers limited-time and limited-quantity deals on selected products at special prices. All deals are subject to availability and specific conditions.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">2. Eligibility</h2>
                            <div className="leading-relaxed text-gray-600">
                                <p className="mb-2">By using NZL, you confirm that:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>You are at least 18 years old.</li>
                                    <li>You have the legal capacity to enter into binding agreements.</li>
                                    <li>All information provided by you is accurate and up to date.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">3. Account Registration</h2>
                            <ul className="list-disc pl-5 space-y-1 leading-relaxed text-gray-600">
                                <li>You may be required to create an account to access certain features.</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                                <li>NZL is not responsible for any unauthorized use of your account.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">4. Orders & Payments</h2>
                            <ul className="list-disc pl-5 space-y-1 leading-relaxed text-gray-600">
                                <li>All prices are displayed in Saudi Riyals (SAR) unless stated otherwise.</li>
                                <li>Payments must be completed online using available payment methods.</li>
                                <li>Once an order is confirmed, it cannot be canceled or modified.</li>
                                <li>NZL reserves the right to reject or cancel any order due to availability, pricing errors, or suspected misuse.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">5. Deals Policy</h2>
                            <ul className="list-disc pl-5 space-y-1 leading-relaxed text-gray-600">
                                <li>All deals are available for a limited time and limited quantity.</li>
                                <li>Once a deal ends or sells out, it cannot be reactivated.</li>
                                <li>Deal prices are exclusive and may not be combined with other offers unless explicitly stated.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">6. No Cancellation, Return, or Exchange</h2>
                            <div className="leading-relaxed text-gray-600">
                                <p className="mb-2">Due to the nature of deal-based pricing:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>All purchases are final.</li>
                                    <li>NZL does not offer cancellations, returns, or exchanges.</li>
                                    <li>Users are responsible for reviewing all product and deal details before completing a purchase.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">7. Defective Products & Warranty</h2>
                            <ul className="list-disc pl-5 space-y-1 leading-relaxed text-gray-600">
                                <li>All products are sourced from authorized sellers or official distributors.</li>
                                <li>If a product has a manufacturing defect, users may contact Customer Service through the App.</li>
                                <li>Any warranty or service is subject to the terms and conditions of the authorized distributor.</li>
                                <li>NZL does not provide direct repair or replacement services.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">8. Delivery</h2>
                            <ul className="list-disc pl-5 space-y-1 leading-relaxed text-gray-600">
                                <li>Delivery is available within Saudi Arabia only.</li>
                                <li>Estimated delivery times are provided for reference and may vary due to logistics or external factors.</li>
                                <li>If the delivery agent cannot reach the customer, delivery may be rescheduled automatically.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">9. Group Deals</h2>
                            <ul className="list-disc pl-5 space-y-1 leading-relaxed text-gray-600">
                                <li>Group Deals require a minimum number of purchases within a specific time.</li>
                                <li>The displayed amount is reserved, not charged, until the deal conditions are met.</li>
                                <li>If the required number is not reached, the reserved amount will be automatically released.</li>
                                <li>Some banks may take additional time to release reserved amounts.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">10. User Responsibilities</h2>
                            <div className="leading-relaxed text-gray-600">
                                <p className="mb-2">You agree not to:</p>
                                <ul className="list-disc pl-5 space-y-1 mb-2">
                                    <li>Misuse the App or attempt to disrupt its functionality.</li>
                                    <li>Provide false or misleading information.</li>
                                    <li>Use the App for unlawful or fraudulent purposes.</li>
                                </ul>
                                <p>NZL reserves the right to suspend or terminate accounts that violate these Terms.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">11. Intellectual Property</h2>
                            <p className="leading-relaxed text-gray-600">
                                All content within the App, including text, images, logos, and software, is owned by or licensed to NZL and may not be copied, reproduced, or used without prior written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">12. Limitation of Liability</h2>
                            <ul className="list-disc pl-5 space-y-1 leading-relaxed text-gray-600">
                                <li>NZL is not liable for indirect, incidental, or consequential damages arising from the use of the App.</li>
                                <li>NZL acts as a platform connecting users with sellers and is not responsible for seller performance beyond what is required by law.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">13. Modifications to Terms</h2>
                            <p className="leading-relaxed text-gray-600">
                                NZL reserves the right to update or modify these Terms & Conditions at any time. Continued use of the App constitutes acceptance of the updated terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">14. Governing Law</h2>
                            <p className="leading-relaxed text-gray-600">
                                These Terms & Conditions are governed by and interpreted in accordance with the laws of the Kingdom of Saudi Arabia.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">15. Contact Us</h2>
                            <p className="leading-relaxed text-gray-600">
                                For any questions or support, please contact Customer Service through the App.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-center border-t border-gray-100 pt-8">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Have questions regarding our terms?</h3>
                        <a href="mailto:support@nzl.sa" className="inline-block">
                            <Button size="md" variant="primary">
                                Contact Us
                            </Button>
                        </a>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default TermsConditions;
