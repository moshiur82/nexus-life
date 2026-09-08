import torch
import torch.nn as nn
import torch.optim as optim
import pandas as pd
import pickle # স্কেলার সেভ করার জন্য
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from model import NexusBrain

def train_nexus_model():
    # ১. ডাটা লোড করা
    df = pd.read_csv('intelligence/data/biology_dataset.csv')
    X = df.drop('bio_age_offset', axis=1).values
    y = df['bio_age_offset'].values.reshape(-1, 1)

    # ২. ডাটা স্কেলিং (Deep Learning এর জন্য খুব জরুরি)
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # টর্চ টেনসরে রূপান্তর
    X_tensor = torch.FloatTensor(X_scaled)
    y_tensor = torch.FloatTensor(y)

    # ৩. মডেল সেটআপ
    model = NexusBrain(input_size=X.shape[1])
    criterion = nn.MSELoss() # লস ফাংশন
    optimizer = optim.Adam(model.parameters(), lr=0.01)

    # ৪. ট্রেনিং লুপ (১০০ বার ডাটা প্রসেস করবে)
    print("Training Intelligence System...")
    for epoch in range(100):
        optimizer.zero_grad()
        outputs = model(X_tensor)
        loss = criterion(outputs, y_tensor)
        loss.backward()
        optimizer.step()
        
        if (epoch+1) % 20 == 0:
            print(f"Epoch [{epoch+1}/100], Neural Loss: {loss.item():.4f}")

    # ৫. মডেল এবং স্কেলার সেভ করা
    torch.save(model.state_dict(), 'intelligence/nexus_brain.pth')
    with open('intelligence/scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
        
    print("Training Complete. Nexus Brain is now intelligent!")

if __name__ == "__main__":
    train_nexus_model()