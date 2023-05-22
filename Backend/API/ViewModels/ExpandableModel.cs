using System.Text.Json.Serialization;

namespace API.ViewModels;

public class ExpandableModel<TModel, TKey> : IExpandable where TModel : EntityModel<TKey>
{
    public bool Expanded { get; set; }
    public TModel Model { get; private set; }

    public ExpandableModel(TModel model)
    {
        Model = model;
    }
}