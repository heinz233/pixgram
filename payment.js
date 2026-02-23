// M-Pesa Payment Simulation
const PaymentSimulator = {
    // Registration fee
    REGISTRATION_FEE: 300,

    // Simulate M-Pesa STK Push
    initiateSTKPush(phoneNumber, amount, purpose, callback) {
        // Show loading state
        this.showLoading('Initiating M-Pesa payment...');
        
        // Simulate API delay
        setTimeout(() => {
            // Generate transaction ID
            const transactionId = 'MP' + Date.now();
            
            // Simulate payment success (in real app, this would be callback from M-Pesa)
            this.simulatePayment(phoneNumber, amount, transactionId, purpose, callback);
        }, 2000);
    },

    // Simulate payment processing
    simulatePayment(phoneNumber, amount, transactionId, purpose, callback) {
        this.showLoading('Processing payment...');
        
        setTimeout(() => {
            // Simulate 90% success rate
            const success = Math.random() > 0.1;
            
            if (success) {
                const payment = {
                    transactionId: transactionId,
                    phone: phoneNumber,
                    amount: amount,
                    purpose: purpose,
                    status: 'completed',
                    timestamp: new Date().toISOString()
                };
                
                // Save payment
                AppData.savePayment(payment);
                
                this.hideLoading();
                callback.success(payment);
            } else {
                this.hideLoading();
                callback.error('Payment failed. Please try again.');
            }
        }, 2000);
    },

    // Show loading overlay
    showLoading(message) {
        let overlay = document.getElementById('paymentOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'paymentOverlay';
            overlay.innerHTML = `
                <div class="payment-modal">
                    <div class="payment-spinner"></div>
                    <p class="payment-message">${message}</p>
                </div>
            `;
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;
            
            const modalStyle = `
                <style>
                    .payment-modal {
                        background: white;
                        padding: 40px;
                        border-radius: 15px;
                        text-align: center;
                        max-width: 350px;
                    }
                    .payment-spinner {
                        width: 50px;
                        height: 50px;
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #667eea;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .payment-message {
                        color: #333;
                        font-size: 16px;
                    }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', modalStyle);
            document.body.appendChild(overlay);
        } else {
            overlay.querySelector('.payment-message').textContent = message;
            overlay.style.display = 'flex';
        }
    },

    // Hide loading overlay
    hideLoading() {
        const overlay = document.getElementById('paymentOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    },

    // Show payment modal
    showPaymentModal(type, amount, onComplete) {
        const modal = document.createElement('div');
        modal.id = 'paymentModal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="PaymentSimulator.closeModal()">&times;</button>
                
                <div class="modal-header">
                    <div class="mpesa-logo">
                        <span style="font-size: 40px;">💳</span>
                    </div>
                    <h2>Pay with M-Pesa</h2>
                    <p class="payment-amount">KES ${amount.toLocaleString()}</p>
                    <p class="payment-purpose">${type === 'registration' ? 'Photographer Registration' : 'Service Booking'}</p>
                </div>
                
                <div class="modal-body">
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" id="mpesaPhone" placeholder="2547XXXXXXXX" value="2547">
                        <small>Enter your M-Pesa registered number</small>
                    </div>
                    
                    <button class="mpesa-btn" onclick="PaymentSimulator.processPayment('${type}', ${amount})">
                        <span>💳</span> Pay via M-Pesa
                    </button>
                    
                    <div class="payment-instructions">
                        <p><strong>How to pay:</strong></p>
                        <ol>
                            <li>Enter your phone number above</li>
                            <li>Click "Pay via M-Pesa"</li>
                            <li>You will receive an STK push on your phone</li>
                            <li>Enter your PIN to complete payment</li>
                        </ol>
                    </div>
                </div>
            </div>
        </style>
            <style>
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 999;
                }
                .modal-content {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    width: 90%;
                    max-width: 400px;
                    z-index: 1000;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }
                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 28px;
                    cursor: pointer;
                    color: #999;
                }
                .modal-header {
                    text-align: center;
                    margin-bottom: 25px;
                }
                .mpesa-logo {
                    margin-bottom: 15px;
                }
                .modal-header h2 {
                    color: #333;
                    margin-bottom: 10px;
                }
                .payment-amount {
                    font-size: 32px;
                    font-weight: bold;
                    color: #667eea;
                    margin: 10px 0;
                }
                .payment-purpose {
                    color: #666;
                    font-size: 14px;
                }
                .modal-body .form-group {
                    margin-bottom: 20px;
                }
                .modal-body label {
                    display: block;
                    color: #333;
                    font-weight: 500;
                    margin-bottom: 8px;
                }
                .modal-body input {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #e1e1e1;
                    border-radius: 10px;
                    font-size: 16px;
                }
                .modal-body small {
                    color: #999;
                    font-size: 12px;
                }
                .mpesa-btn {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }
                .mpesa-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
                }
                .payment-instructions {
                    margin-top: 20px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 10px;
                    font-size: 13px;
                    color: #666;
                }
                .payment-instructions ol {
                    margin-top: 10px;
                    padding-left: 20px;
                }
                .payment-instructions li {
                    margin-bottom: 5px;
                }
            </style>
        `;
        
        document.body.appendChild(modal);
        
        // Store callback
        this.paymentCallback = onComplete;
        
        // Close on overlay click
        document.querySelector('.modal-overlay').addEventListener('click', () => {
            this.closeModal();
        });
    },

    // Process payment
    processPayment(type, amount) {
        const phone = document.getElementById('mpesaPhone').value;
        
        if (!phone || phone.length < 10) {
            alert('Please enter a valid phone number');
            return;
        }
        
        const purpose = type === 'registration' ? 'Photographer Registration' : 'Service Booking';
        
        this.initiateSTKPush(phone, amount, purpose, {
            success: (payment) => {
                alert('Payment successful! Transaction ID: ' + payment.transactionId);
                this.closeModal();
                if (this.paymentCallback) {
                    this.paymentCallback.success(payment);
                }
            },
            error: (error) => {
                alert(error);
                if (this.paymentCallback) {
                    this.paymentCallback.error(error);
                }
            }
        });
    },

    // Close modal
    closeModal() {
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.remove();
        }
        this.paymentCallback = null;
    }
};

window.PaymentSimulator = PaymentSimulator;
