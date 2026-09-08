import torch
import torch.nn as nn

# একটি খুব সিম্পল নিউরাল নেটওয়ার্ক স্ট্রাকচার (ভবিষ্যতে আমরা এটি উন্নত করবো)
class BiologyModel(nn.Module):
    def __init__(self):
        super(BiologyModel, self).__init__()
        self.layer = nn.Linear(5, 1) # ধরুন ৫টি বায়ো-সিগন্যাল থেকে ১টি রেজাল্ট দিবে

    def forward(self, x):
        return self.layer(x)

def get_ai_insight(query):
    # আপাতত আমরা সিম্পল লজিক ব্যবহার করছি, পরে এটি মডেল থেকে আসবে
    insights = {
        "heart": "Cardiac rhythm is stable at 64 bpm. Optimal recovery detected.",
        "neural": "Neural flow is at 82ms. Cognitive resilience is within top 5% range.",
        "sleep": "Sleep trajectory suggests a 12% increase in REM phase efficiency.",
        "default": "Biological systems are operating within optimal parameters. No anomalies detected."
    }
    
    query = query.lower()
    for key in insights:
        if key in query:
            return insights[key]
    return insights["default"]